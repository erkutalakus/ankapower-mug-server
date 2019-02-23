Meteor.publish("images", function () {
	console.log('published');
	return Images.find().cursor;
});

Meteor.publish("pdfs", function () {
	return PDFs.find().cursor;
});

Meteor.publish("users", function () {
	return Meteor.users.find();
});

Meteor.publish("records", function () {
	return Records.find();
});