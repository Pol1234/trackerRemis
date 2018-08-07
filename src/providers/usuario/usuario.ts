import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class UsuarioProvider {

  clave: string;
  user:any ={};

  constructor(private afDB: AngularFirestore) {
    
  }

  verificaUsuario( clave: string){

    clave= clave.toLocaleLowerCase();

    return new Promise( (resolve, reject) =>{

      this.afDB.doc(`usuarios/${ clave }`)
      .valueChanges().subscribe(data =>{

        if(data){

          this.clave= clave;
          this.user= data;
          resolve(true);

        }else{
          
          resolve(false);
        }

        
      })
      

    });

  }

}
