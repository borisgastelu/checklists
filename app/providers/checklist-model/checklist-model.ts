import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChecklistModel {

	checklist: any;
	checklistObserver: any;
	items: any[];

	constructor(public title: string, items: any[]) {
		this.items = items;
		this.checklist = Observable.create(observer => {
			this.checklistObserver = observer;
		});
	}

	setTitle(title: string): void {
		this.title = title;
	}

	addItem(item): void {
		this.items.push({
			title: item,
			checked: false
		});

		this.checklistObserver.next(true);
	}

	removeItem(item): void {
		let index = this.items.indexOf(item);

		if (index > -1) {
		    this.items.splice(index, 1);
		}

		this.checklistObserver.next(true);
	}

	toggleItem(item): void {
		let index = this.items.indexOf(item);

		if (index > -1) {
		    this.items[index].checked = !item.checked;
		}

		this.checklistObserver.next(true);
	}

	uncheckItems(): void {
		this.items.forEach(item => {
		    if (item.checked) {
				this.toggleItem(item);
			}
		});
	}

}
