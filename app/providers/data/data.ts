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

	setData(data): void {
		let newData = JSON.stringify(data);
		this.storage.set('checklists', newData);
	}

}
