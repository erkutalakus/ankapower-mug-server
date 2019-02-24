Router.configure({
	layoutTemplate: 'MainLayout',
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
		return [Meteor.subscribe("images"), Meteor.subscribe("pdfs"), Meteor.subscribe("users"), Meteor.subscribe("records")];
	},
	action: function () {
		this.render('Home');
	}
});

Router.route('/new', {
	name: 'new',
	waitOn: function () {
		return [Meteor.subscribe("images"), Meteor.subscribe("pdfs"), Meteor.subscribe("users"), Meteor.subscribe("records")];
	},
	action: function () {
		this.render('New');
	}
});

Router.route('/qr/:_qrtext', {
	name: 'qr',
	waitOn: function () {
		return [Meteor.subscribe("records")];
	},
	action: function () {
		this.render('QR');
	}
});

Router.route('/lockbagcreated/:lockbagid', {
	name: 'lockbagcreated',
	waitOn: function () {
		return [Meteor.subscribe("lockbags")];
	},
	action: function () {
		this.render('LockBagCreated')
	}
});

Router.route('/lockbagcreate', {
	name: 'lockbagcreate',
	waitOn: function () {
		return [Meteor.subscribe("lockbags")];
	},
	action: function () {
		this.render('LockBagCreate')
	}
});

Router.route('/lockbag/:lockbagid', {
	name: 'lockbag',
	waitOn: function () {
		return [Meteor.subscribe("lockbags"), Meteor.subscribe("locks")];
	},
	action: function () {
		let lockbagId = Router.current().params.lockbagid;
		let lockId = Locks.insert({lockbagId: lockbagId});
		Router.go('lock', {lockid: lockId});
	}
});

Router.route('/lock/:lockid', {
	name: 'lock',
	waitOn: function () {
		return [Meteor.subscribe("lockbags"), Meteor.subscribe("locks")];
	},
	action: function () {
		this.render('Lock');
	}
});