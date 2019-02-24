Template.Lock.helpers({
	'Lock': () => {
		let lockId = Router.current().params.lockid;
		let lock = Locks.findOne(lockId);

		if (lock.locked) {
			return lock;
		}

		window.location = LockBags.findOne(lock.lockbagId).link;
	},
	'getLockBagTitle': (lock) => {
		let lockbag = LockBags.findOne(lock.lockbagId);
		return lockbag.title;
	},
	'getLockBagAge': (lock) => {
		let lockbag = LockBags.findOne(lock.lockbagId);
		return lockbag.minAge;
	},
	"QRText": (lock) => {
		return 'unlock' + lock._id;
	}
});