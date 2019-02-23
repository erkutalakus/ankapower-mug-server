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
	this.response.end(JSON.stringify(Records.findOne(this.params._qrtext)));
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
		'Content-Disposition': 'attachment; filename=' + fileCursor.name,
		'Content-Length': stat.size
	});

	// Pipe the file contents to the response
	fs.createReadStream(fileCursor.path).pipe(this.response);
}, {
	name: 'fileCursor',
	where: 'server'
});