Meteor.publish("images", function () {
	return Images.find().cursor;
});

Meteor.publish("pdfs", function () {
	return PDFs.find().cursor;
});