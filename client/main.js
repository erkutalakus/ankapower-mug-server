Router.configure({
	//layoutTemplate: 'MainLayout',
	onAfterAction: function () {

	},
	onBeforeAction: function() {
		$(window).scrollTop(0);
		this.next();
	},
	waitOn: function () {
		return [];
	},
	notFoundTemplate: '_404',
	loadingTemplate: '_Loading'
});

Router.route('/', {
	name: 'home',
	waitOn: function () {
		return [];
	},
	action: function () {
		this.render('Home');
	}
});

Router.route('/qr/:_qrtext', {
	name: 'qr',
	waitOn: function () {
		return [];
	},
	action: function () {
		this.render('QR');
	}
});