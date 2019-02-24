Template.Lock.helpers({
	'Lock': () => {
		let lockId = Router.current().params.lockid;
		let lock = Locks.findOne(lockId);
		console.log(lock);
		if (lock.locked) {
			return lock;
		}
		console.log(window);
		window.location = LockBags.findOne(lock.lockbagId).link;
	},
	"QRText": (lock) => {
		return 'unlock' + lock._id;
	}
});