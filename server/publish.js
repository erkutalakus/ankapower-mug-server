Meteor.publish("images", function () {
	console.log('published');
	return Images.find().cursor;
});

Meteor.publish("pdfs", function () {
	return PDFs.find().cursor;
});