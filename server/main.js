import { Meteor } from 'meteor/meteor';
let fs = Npm.require('fs');

Meteor.startup(() => {
  // code to run on server at startup
});

Router.route('/register', function () {
	let body = this.request.body;
	let id;
	try {
		id = Accounts.createUser({
			username: body.username,
			profile: {name: body.name, birthday: moment(body.birthday).toDate(), gender: body.gender}
		});
	} catch (e) {
		console.log(e);
		returnResponse(this, {success: false, message: e.message, data: e});
		return;
	}
	returnResponse(this, {success: !!id, data: { userId: id }});

}, {
	name: 'register',
	where: 'server'
});

Router.route('/updatefcmtoken', function () {
	let fcmToken = this.request.body.fcmToken;
	if (!fcmToken) {
		returnResponse(this, {success: false, message:"give fcmToken"});
		return;
	}

	let count = Meteor.users.update(this.request.headers['x-auth'], { $set : { "profile.fcmToken": fcmToken }});

	returnResponse(this, {success: count > 0});
}, {
	name: 'updateFcmToken',
	where: 'server'
});

Router.route('/get/:_qrtext', function () {
	let qrId = this.params._qrtext;

	try {
		let record = Records.findOne(qrId);

		if (!record) {
			returnResponse(this, {success: false, data: "Record not found"});
			return;
		}

		Meteor.users.update(this.request.headers['x-auth'], {$push: {'profile.recordHistory': {id: qrId, date: new Date()} }});
		Records.update(qrId, {$inc: {counter: 1}});

		let data = {censored: null, original: Records.findOne(qrId), isCensored: false, isRestricted: false};

		let user = Meteor.users.findOne(this.request.headers['x-auth']);
		if (!user) {
			returnResponse(this, {success: false, data: "Not authorized"});
			return;
		}
		user.age = moment().diff(moment(user.profile.birthday), 'years');

		if (record.minAge > user.age) {
			data.isRestricted = true;
			returnResponse(this, {success: true, data: data});
			return;
		}

		if (record.texts)
			record.texts = record.texts.filter(function (item) {
				let willNotReturn = item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
				data.isCensored = data.isCensored || willNotReturn;
				return !willNotReturn;
			});

		if (record.imageGroups) {
			record.imageGroups = record.imageGroups.filter(function (item) {
				let willNotReturn = item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
				data.isCensored = data.isCensored || willNotReturn;
				return !willNotReturn;
			});
			if (record.imageGroups.images)
				record.imageGroups.images = record.imageGroups.images.filter(function (item) {
					let willNotReturn = item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
					data.isCensored = data.isCensored || willNotReturn;
					return !willNotReturn;
				});
		}

		if (record.videos)
			record.videos = record.videos.filter(function (item) {
				let willNotReturn = item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
				data.isCensored = data.isCensored || willNotReturn;
				return !willNotReturn;
			});

		if (record.documents)
			record.documents = record.documents.filter(function (item) {
				let willNotReturn = item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
				data.isCensored = data.isCensored || willNotReturn;
				return !willNotReturn;
			});

		data.censored = record;

		returnResponse(this, {success: true, data: data});
	} catch (e) {
		console.log(e);
		returnResponse(this, {success: false, message: e.message, data: e});
	}
}, {
	name: 'get',
	where: 'server'
});

Router.route('/history', function () {
	try {
		let history = Meteor.users.findOne(this.request.headers['x-auth']).profile.recordHistory;

		if (!history) {
			returnResponse(this, {success: true, data: []});
			return;
		}

		history = history.sort(function(f, s) {
			if (f.date < s.date)
				return 1;
			else if (f.date > s.date)
				return -1;
			else return 0;
		});
		let data = history.map(function (item) {
			return {id: item.id, title: Records.findOne(item.id).title, date: moment(item.date).add(3, 'hours').format("MM.DD.YYYY HH:mm")};
		});

		returnResponse(this, {success: true, data: data});
	} catch (e) {
		console.log(e);
		returnResponse(this, {success: false, message: e.message, data: e});
	}
}, {
	name: 'history',
	where: 'server'
});

Router.route('/file/:id', function () {
	let fileCursor = Images.findOne(this.params.id) || PDFs.findOne(this.params.id);

	// Attempt to read the file size
	let stat = null;
	try {
		stat = fs.statSync(fileCursor.path);
	} catch (_error) {
		this.response.statusCode = 404;
		this.response.end();
		return;
	}

	// Set the headers
	this.response.writeHead(200, {
		'Content-Type': fileCursor.mime,
		//'Content-Disposition': 'attachment; filename=' + fileCursor.name,
		'Content-Length': stat.size
	});

	// Pipe the file contents to the response
	fs.createReadStream(fileCursor.path).pipe(this.response);
}, {
	name: 'fileCursor',
	where: 'server'
});

Router.route('/unlock/:lockid', function () {
	try {
		let user = Meteor.users.findOne(this.request.headers['x-auth']);
		let lockid = this.params.lockid;
		if (!user) {
			returnResponse(this, {success: false, message: "user not found"});
			return;
		}

		let lock = Locks.findOne(lockid);
		user.age = moment().diff(moment(user.profile.birthday), 'years');
		if (user.age < LockBags.findOne(lock.lockbagId).minAge) {
			returnResponse(this, {success: false, message: "restricted"});
			return;
		}

		Locks.update(lockid, {$set : { locked : false }});

		returnResponse(this, {success: true, message: "unlocked"});
	} catch (e) {
		console.log(e);
		returnResponse(this, {success: false, message: e.message, data: e});
	}
}, {
	name: 'unlock',
	where: 'server'
});