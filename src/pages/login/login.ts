import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;  

  constructor(public navCtrl: NavController, 
              private alertCtrl: AlertController, 
              public loadingCtrl: LoadingController,
              public _usuarioProv: UsuarioProvider) {
  }

  ionViewDidLoad() {
    this.slides.paginationType='progress';
    this.slides.lockSwipes(true); //para bloquear el slides
    this.slides.freeMode= false; //para bloquear

    
  }


//se dispara en el boton de ingresar del login
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
      content: 'Verificando'
    });

    loading.present();

    this._usuarioProv.verificaUsuario( clave )
    .then( existe =>{
      
      loading.dismiss();

      if(existe){
        this.slides.lockSwipes(false); //para desbloquear el slides
        this.slides.freeMode= true;
        this.slides.slideNext()
        this.slides.lockSwipes(true); //para bloquear el slides
        this.slides.freeMode= false;

      }else{

        this.alertCtrl.create({
          title: 'Usuario incorrecto',
          subTitle: 'Contactese con el administrador o intente nuevamente',
          buttons: ['Aceptar']

        }).present();
        


      }



    })

    
  }

}
