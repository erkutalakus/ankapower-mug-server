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
		returnResponse(this, {success: false, message: e.message});
		return;
	}
	returnResponse(this, {success: !!id, data: { userId: id}});

}, {
	name: 'register',
	where: 'server'
});
//
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
		Meteor.users.update(this.request.headers['x-auth'], {$push: {'profile.recordHistory': qrId}});
		Records.update(qrId, {$inc: {counter: 1}});

		let data = {censored: null, original: Records.findOne(qrId), isCensored: false, isRestricted: false};

		let user = Meteor.users.findOne(this.request.headers['x-auth']);
		user.age = moment(user.profile.birthday).diff(moment(), 'years');
		let record = Records.findOne(qrId);

		if (record.minAge > user.age) {
			data.isRestricted = true;
			this.response.end(JSON.stringify({success: true, data: data}));
			return;
		}

		record.texts = record.texts.filter(function (item) {
			data.isCensored = data.isCensored || item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
			return !data.isCensored;
		});
		record.imageGroups = record.imageGroups.filter(function (item) {
			data.isCensored = data.isCensored || item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
			return !data.isCensored;
		});
		record.imageGroups.images = record.imageGroups.images.filter(function (item) {
			data.isCensored = data.isCensored || item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
			return !data.isCensored;
		});
		record.videos = record.videos.filter(function (item) {
			data.isCensored = data.isCensored || item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
			return !data.isCensored;
		});
		record.documents = record.documents.filter(function (item) {
			data.isCensored = data.isCensored || item.minAge > user.age || (item.gender !== 'All' && item.gender !== user.profile.gender);
			return !data.isCensored;
		});

		data.censored = record;

		this.response.end(JSON.stringify({success: true, data: data}));
	} catch (e) {
		this.response.end(JSON.stringify({success: false, message: e.message}));
	}
}, {
	name: 'get',
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