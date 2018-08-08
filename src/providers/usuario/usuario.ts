import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from '../../../node_modules/ionic-angular/';
import { Storage } from '@ionic/storage';


@Injectable()
export class UsuarioProvider {

  clave: string;
  user:any ={};

  constructor(private afDB: AngularFirestore, private platform: Platform, private storage: Storage) {
    
  }

  verificaUsuario( clave: string){

    clave= clave.toLocaleLowerCase();

    return new Promise( (resolve, reject) =>{

      this.afDB.doc(`usuarios/${ clave }`)
      .valueChanges().subscribe(data =>{

        if(data){

          this.clave= clave;
          this.user= data;
          this.guardarStorage();
          resolve(true);

        }else{
          
          resolve(false);
        }

        
      })
      

    });

  }

  guardarStorage(){

    if(this.platform.is('cordova')){
      //celular
      this.storage.set('clave', this.clave);
    }else{
      //escritorio
      localStorage.setItem('clave', this.clave);
    }
    
  }

  cargarStorage(){
    return new Promise( (resolve, reject)=> {

      if(this.platform.is('cordova')){
        //celular
        this.storage.get('clave').then( val =>{
          if(val){
            this.clave = val;
            resolve(true);
          }else{
            resolve(false)
          }
        });

      }else{
        //escritorio
       if( localStorage.getItem('clave') ){
         this.clave= localStorage.getItem('clave');
         resolve(true);
       }else{
         resolve(false);
       }

      }

    });
  }

}
