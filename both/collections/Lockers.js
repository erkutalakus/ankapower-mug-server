LockBags = new Mongo.Collection('lockbags');

LockBagsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title"
	},
	link: {
		type: String,
		label: "Link"
	},
	minAge: {
		type: Number,
		label: "Age Limit"
	}
});

LockBags.allow({
	insert: () => {
		return true;
	},
	update: () => {
		return true;
	},
	remove: () => {
		return false;
	}
});

LockBags.attachSchema(LockBagsSchema);
