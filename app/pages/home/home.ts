import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../providers/checklist-model/checklist-model';

import { Data } from '../../providers/data/data';

// Decorator, agregar metadata a una clase especifica
@Component({
	templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	// propiedad miembro
	title: string = 'Checklists';
	checklists: ChecklistModel[] = [];

	// propiedades miembro / Inyeccion de Dependencias (Servicios)
	constructor(
		private _navCtrl: NavController,
		private _alertCtrl: AlertController,
		private _dataService: Data
	) {
		this._dataService.getData()
			.then(checklists => {
				let savedChecklist: any = false;

				if (typeof(checklists) != 'undefined') {
				    savedChecklist = JSON.parse(checklists);
				}

				if (savedChecklist) {
					savedChecklist.forEach(checklist => {
						let loadedChecklist = new ChecklistModel(checklist.title, checklist.items);
						this.checklists.push(loadedChecklist);

						loadedChecklist.checklist.subscribe(update => {
							this.save();
						});
					});
				}
			});
	}

	view(checklist): void {
		this._navCtrl.push(ChecklistPage, { data: checklist });
	}

	add(): void {
		let prompt = this._alertCtrl.create({
			title: 'New Checklist',
			message: 'Enter the name of your new checklist below:',
			inputs: [
				{
					name: 'name'
				}
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: data => {
						let newChecklist = new ChecklistModel(data.name, []);
						this.checklists.push(newChecklist);

						// Subscribe -> Atender a los cambios q se generen
						newChecklist.checklist.subscribe(update => {
							this.save();
						});

						this.save();
					}
				}
			]
		});

		prompt.present();
	}

	rename(checklist): void {
		let prompt = this._alertCtrl.create({
			title: 'Rename Checklist',
			message: 'Enter the new name of this checklist below:',
			inputs: [
				{
					name: 'name'
				}
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: data => {
						let index = this.checklists.indexOf(checklist);

						if (index > -1) {
						    this.checklists[index].setTitle(data.name);
							this.save();
						}
					}
				}
			]
		});

		prompt.present();
	}

	remove(checklist): void {
		let index = this.checklists.indexOf(checklist);

		if (index > -1) {
		    this.checklists.splice(index, 1);
			this.save();
		}
	}

	save(): void {
		this._dataService.setData(this.checklists);
	}

}
