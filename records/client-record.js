class ClientRecord {
	constructor(obj) {
		// to jest jakby to obj, które przekazujemy do metody create() w pliku db.js
		this.id = obj.id;
		this.mail = obj.mail;
		this.name = obj.name;

		this.nextContact = obj.nextContact;
		this.notes = obj.notes;
	}
}
module.exports = {
	ClientRecord,
};
