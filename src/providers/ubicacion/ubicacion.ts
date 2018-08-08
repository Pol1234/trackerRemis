import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsuarioProvider } from '../usuario/usuario';
import { Subscription } from '../../../node_modules/rxjs';


@Injectable()
export class UbicacionProvider {

  remisero: AngularFirestoreDocument<any>;
  private watch: Subscription;

  constructor(private geolocation: Geolocation, private afDB: AngularFirestore, private _usuarioProv: UsuarioProvider) {
    this.remisero= afDB.doc(`/usuarios/${ _usuarioProv.clave }`);
  }
  iniciarGeolocalizacion(){
    this.geolocation.getCurrentPosition().then( (resp)=>{
      //console.log(resp.coords);

      this.remisero.update({
        lat: resp.coords.latitude,
        lon: resp.coords.longitude,
        clave: this._usuarioProv.clave //es opcional
      })

      this.watch = this.geolocation.watchPosition()
      .subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude

      this.remisero.update({
        lat: data.coords.latitude,
        lon: data.coords.longitude,
        clave: this._usuarioProv.clave //es opcional
      })

      console.log('watch data es:'+ data.coords.latitude );
      });

    }).catch( (error)=> {

      console.log('Error de geolocalización:' + error);
    });
  }

  detenerUbicacion(){
    try {
      this.watch.unsubscribe();
    } catch (error) {
      console.log(JSON.stringify(error));
    }

  }

}
