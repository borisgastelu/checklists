import { Component } from '@angular/core';
import { ViewController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, ImagePicker } from 'ionic-native';

@Component({
	templateUrl: 'build/pages/picture/picture.html'
})
export class PicturePage {

	images: string[] = [];

	constructor(
		private _viewCtrl: ViewController,
		private _navParams: NavParams,
		private _actionSheetCtrl: ActionSheetController
	) { }

	// Hooks, mantener el ciclo de vida de las vistas
	ngOnInit() {
		this.images = this._navParams.get('images');
	}

	getPicture() {
		let actionSheet = this._actionSheetCtrl.create({
			title: 'Pick a picture from:',
			buttons: [
				{
					text: 'Gallery',
					handler: () => this.takeFromGallery()
				},
				{
					text: 'Camera',
					handler: () => this.takeFromCamera()
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});

		actionSheet.present();
	}

	takeFromCamera() {
		Camera.getPicture({}).then(image => {
			this.images.push(image);
		});
	}

	takeFromGallery() {
		ImagePicker.getPictures({}).then(images => {
			this.images.push(images[0]);
		});
	}

	back() {
		this._viewCtrl.dismiss(this.images);
	}

}
