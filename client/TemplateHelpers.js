Template.registerHelper(
	'getImageLinkFromImageId', function (id) {
		if (id) {
			let img = Images.findOne(id);
			if (img)
				return img.link();
			else
				return "/images/noimage.svg";
		} else {
			return "/images/noimage.svg";
		}
	}
);

Template.registerHelper(
	'equ', function (arg1, arg2) {
		return arg1 === arg2;
	}
);

Template.registerHelper(
	'getUserLangKey', function () {
		return getUserLanguage();
	}
);

Template.registerHelper(
	'getPDFLinkFromPDFId', function (id) {
		if (id) {
			let file = PDFs.findOne(id);
			if (file)
				return file.link();
		}
	}
);

Template.registerHelper(
	'isUserAuthorized', function () {
		if (Meteor.userId()) {
			return Roles.userIsInRole(Meteor.userId(), "admin") || Roles.userIsInRole(Meteor.userId(), "moderator");
		}
	}
);

Template.registerHelper(
	'isActiveUserConfirmed', function () {
		if (Meteor.userId()) {
			return Meteor.users.findOne(Meteor.userId()).confirmed;
		}
	}
);

Template.registerHelper(
	'Partners', () => {
		return Partners.find({}, {sort: {rank: 1}}).fetch();
	}
);

Template.registerHelper(
	'Newsletters', () => {
		return Newsletters._collection.find({}, {sort: {createdAt: 1}}).fetch();
	}
);

Template.registerHelper(
	'Guides', () => {
		let sortedGuides = Guides.find({}, {sort: {rank: 1}}).fetch();

		//sort guides by also chapter ranks
		_.each(sortedGuides, function(guide) {
			guide.tr.chapters = _.orderBy(guide.tr.chapters, ['rank'], ['asc']);
			guide.it.chapters = _.orderBy(guide.it.chapters, ['rank'], ['asc']);
			guide.gr.chapters = _.orderBy(guide.gr.chapters, ['rank'], ['asc']);
			guide.pt.chapters = _.orderBy(guide.pt.chapters, ['rank'], ['asc']);
		});

		return sortedGuides;
	}
);

Template.registerHelper(
	'urlize', (str) => {
		return urlize(str);
	}
);

Template.registerHelper(
	'formatDate', (date) => {
		return moment(date).format('ll');
	}
);

Template.registerHelper(
	'formatDateTime', (date) => {
		return moment(date).format('lll');
	}
);

Template.registerHelper(
	'UserStatus', (id) => {
		if (!id) {
			id = Meteor.userId();
		}

		return Meteor.users.findOne(id).status.online ? "online" : "offline";
	}
);
Template.registerHelper(
	'getUserFromId', (userId) => {
		if (!userId) {
			userId = Meteor.userId();
		}
		return Meteor.users.findOne(userId);
	}
);