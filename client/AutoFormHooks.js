AutoForm.hooks({
	insertRecordForm: {
		onError: function(formType, error) {
			$.notify(error);
			AutoForm.selectFirstInvalidField('insertRecordForm', this.ss);
		},
		onSuccess: function(formType, result) {
			Router.go('/qr/' + result);
		}
	},
	insertLockBagForm: {
		onError: function(formType, error) {
			$.notify(error);
			AutoForm.selectFirstInvalidField('insertLockBagForm', this.ss);
		},
		onSuccess: function(formType, result) {
			Router.go('/lockbagcreated/' + result);
		}
	}
});