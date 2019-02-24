Locks = new Mongo.Collection('locks');

LocksSchema = new SimpleSchema({
	lockbagId: {
		type: String
	},
	locked: {
		type: Boolean,
		defaultValue: true
	}
});

Locks.allow({
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

Locks.attachSchema(LocksSchema);