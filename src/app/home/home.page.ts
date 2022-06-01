import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes =[]
  router: any;

  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController, private authService: AuthService) {
    this.dataService.getNotes().subscribe(res =>{
      console.log(res);
      this.notes = res;
    });

  }

  async logout() {
    this.authService.logout();
    this.router.navigateByUrl('/', { replacerUrl: true})
  }

  async openNote(note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {Id: note.Id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint : 0.5
    })
    modal.present();
  }

  async addNote(){
    const alert = await this.alertCtrl.create({
      header: 'Add an Experiences',
      inputs: [
        {
          name: 'name',
          placeholder: 'Give a title to your experience',
          type: 'text'
        },
        {
          name: 'age',
          placeholder: 'Describe breily your experience',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addNote({name: res.name, age: res.age});
          }
        }
      ]
    });
    await alert.present();
  }

}
