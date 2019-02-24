Meteor.publish("images", function () {
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

Meteor.publish("lockbags", function () {
	return LockBags.find();
});

Meteor.publish("locks", function () {
	return Locks.find();
});