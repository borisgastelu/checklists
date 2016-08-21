import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';

@Injectable()
export class Data {

	storage: Storage;

	constructor() {
		this.storage = new Storage(SqlStorage, { name: 'checklists' });
	}

	getData(): Promise<any> {
		return this.storage.get('checklists');
	}

	setData(data): void { 	// Observable
		let saveData = [];

		// Remove observables
		data.forEach(checklist => {
		    saveData.push({
				title: checklist.title,
				items: checklist.items
			});
		});

		// Save clean data
		let newData = JSON.stringify(saveData);
		this.storage.set('checklists', newData);
	}

}
