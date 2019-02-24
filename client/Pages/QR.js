Template.QR.helpers({
	"RecordTitle": () => {
		return Records.findOne(Router.current().params._qrtext).title;
	},
	"RecordMinAge": () => {
		return Records.findOne(Router.current().params._qrtext).minAge;
	},
	"QRText": () => {
		return Router.current().params._qrtext;
	}
});