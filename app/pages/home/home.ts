import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../providers/checklist-model/checklist-model';

// Decorator, agregar metadata a una clase especifica
@Component({
	templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	// propiedad miembro
	title: string = 'Checklists';
	checklists: ChecklistModel[] = [];

	// propiedades miembro / Inyeccion de Dependencias (Servicios)
	constructor(private _navCtrl: NavController, private _alertCtrl: AlertController) { }

	addChecklist() {
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
						let checklist = new ChecklistModel(data.name, []);
						this.checklists.push(checklist);

						// this.save();	-> Guardar en dispositivo
					}
				}
			]
		});

		prompt.present();
	}

	viewChecklist() {
		this._navCtrl.push(ChecklistPage);
	}

}
