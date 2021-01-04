import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http:HttpClient ) {
    console.log('Spotify service listo');
   }


   getQuery( query:string ){

    const url = `https://api.spotify.com/v1/${ query }`;


    //Token generado con POSTMAN mediante la peticion POST
      /*
              POST https://accounts.spotify.com/api/token 
              grant_type:      client_credentials
              Client ID:       agregar tu Client ID
              Client Secret:   agregar tu Client Secret
      */

    const headers = new HttpHeaders({
      //Token
      // Nota: añadir Bearer + Token
      'Authorization': 'Bearer BQCBklvLdNFlAhyxpIiNIHV4FKi_1RgOcMQkeIvYSXgYtNj-pcz-5PtLR0pkLWeorQTJZkiI10o6gjuxia8'
    });

    return this.http.get(url, { headers });


   }


   getNewReleases() {

    //se le pasa el resto de la url para filtrar los albums a un limite de 20
    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => data['albums'].items ));
  }

  getArtistasSearch( termino:string ){

    //se le pasa el resto de la url para filtrar los artistas a un limite de 15
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
    .pipe( map( data => data['artists'].items ));
  }

  getArtista( id:string ){

    return this.getQuery(`artists/${ id }`);
    //.pipe( map( data => data['artists'].items ));
  }

  getTopTracks( id:string ){

    // artists/{id}/top-tracks
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks'] ));
  }


  
}
