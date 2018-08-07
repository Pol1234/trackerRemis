import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.slides.paginationType='progress';
    this.slides.lockSwipes(true); //para bloquear el slides
    this.slides.freeMode= false; //para bloquear

    
  }



  mostrarInput() {
    let alert = this.alertCtrl.create({
      title: 'Ingrese',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        }/*,
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }*/
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ingresar',
          handler: data => {
            console.log(data);
            this.verificarUsuario( data.username );
            /*if (User.isValid(data.username, data.password)) {
              // logged in!
              console.log(data.username +' '+data.password);
            } else {
              // invalid login
              return false;
            }*/
          }
        }
      ]
    });
    alert.present();
  }

  verificarUsuario( clave ){

    let loading= this.loadingCtrl.create({
      content: 'Verificando';
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

}
