import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { ChecklistModel } from '../../providers/checklist-model/checklist-model';

import { PicturePage } from '../picture/picture';

@Component({
	templateUrl: 'build/pages/checklist/checklist.html',
})
export class ChecklistPage {

	checklist: ChecklistModel;

	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _alertCtrl: AlertController,
		private _modalCtrl: ModalController
	) {
		this.checklist = this._navParams.get('data');
	}

	add(): void {
		let prompt = this._alertCtrl.create({
			title: 'New Item',
			message: 'Enter the name of your new item below:',
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
						this.checklist.addItem(data.name);
					}
				}
			]
		});

		prompt.present();
	}

	remove(item): void {
		this.checklist.removeItem(item);
	}

	toggle(item): void {
		this.checklist.toggleItem(item);
	}

	uncheck(): void {
		this.checklist.uncheckItems();
	}

	takePicture(item) {
		let modal = this._modalCtrl.create(PicturePage, { images: item.images });

		modal.onDidDismiss(images => {
			if (images && images.length > 0) {
				this.checklist.saveImages(item, images);
			}
		});

		modal.present();
	}

}
