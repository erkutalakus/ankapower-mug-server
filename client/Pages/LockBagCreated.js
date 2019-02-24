Template.LockBagCreated.helpers({
	'LockId': () => {
		return { lockbagid: Router.current().params.lockbagid };
	}
});