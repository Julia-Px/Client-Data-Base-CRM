const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid'); // pobieramy sobie moduł v4 z paczki uuid i przemionowujemy (zmieniamy nazwę na uuid)
const { ClientRecord } = require('../records/client-record');

class Db {
	// w konstruktorze robimy wczytanie bazy danych
	constructor(dbFileName) {
		this.dbFileName = path.join(__dirname, '../data', dbFileName); /*  __dirname --> aktualny folder, w którym znajduje się nasz plik, wchodzimy do data i do pliku o nazwie fileName */
		this._load();
	}

	async _load() {
		this._data = JSON.parse(await readFile(this.dbFileName, 'utf8'));
	}

	_save() {
		writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8');
	}

	//Odtąd robimy cruda. Create:

	create(obj) {
		/*  Wcześniej bylo w ten sposób ale potrzebowaliśmy wyciągnąć zmienną id do zmiennej		

this._data.push({
			id: uuid(),
			...obj, // mówimy żeby wziąć cały obiekt i z niego jakby stworzyć nowy obiekt --> robimy to po to żeby powyżej dać id. Czyli mówimy weź wszystkie informacje o obiekcie i na jego podstawie stwórz nowy obiekt z id
		});
		this._save(); */

		const id = uuid();

		this._data.push({
			id,
			...obj,
		});
		this._save();

		return id;
	}

	getAll() {
		return this._data;
	}

	getOne(id) {
		return this._data.find((oneObj) => oneObj.id === id);
	}

	update(id, newObj) {
		this._data = this._data.map((oneObj) => {
			if (oneObj.id === id) {
				return {
					...oneObj, // najpierw rozpraszamy stary obiekt
					...newObj, // potem rozpraszamy nowy obiekt
				}; // służy to do aktualizacji czegoś, jeżeli w tym nowym się coś pozmienia to on zastąpi ten stary
			} else {
				return oneObj; // w przeciwnym wypadku nie zmieniaj obiektu i zwróć taki jaki jest
			}
		}); // w mapowaniu chodziło o zmienianie jednego obiektu w drugi
		this._save();
	}

	/* If'a można było zapisać w następujący sposób: 
	
	oneObj.id === id ? {
					...oneObj,
					...newObj
			} : oneObj; 
	*/

	delete(id) {
		this._data = this._data.filter((oneObj) => oneObj.id !== id); // filter zwraca npwą tablicę. I ta nowa tablica będzie miała wszystkie elementy które, zwrócą true: oneObj.id !== id
		this._save();
	}
}

const db = new Db('client.json'); // w nawiasie podajemy FileNAme

module.exports = { db }; // rozkminić kiedy trzeba nawiasy a kiedy nie
