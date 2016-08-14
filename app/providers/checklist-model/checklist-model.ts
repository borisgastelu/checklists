import { Injectable } from '@angular/core';

@Injectable()
export class ChecklistModel {

	checklist: any;
	items: any[];

	constructor(public title: string, items: any[]) {
		this.items = items;
	}

	addItem(item): void {
		this.items.push({
			title: item,
			checked: false
		});
	}

}
