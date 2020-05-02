import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from '../models/image';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public url:string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getApiUrl(segment = ''): string{
    var url = this.url + segment;
    return url;
  }

  getImages(albumId = null): Observable<any>{
    if(albumId == null){
      return this._http.get(this.url+'images');
    }else{
      return this._http.get(this.url+'images/'+albumId);
    }
  }

  getImage(id:string): Observable<any>{
    return this._http.get(this.url+'image/'+id);
  }

  addImage(image: Image): Observable<any>{
    let json = JSON.stringify(image);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'image', params, {headers: headers});

  }

  editImage(id:string, image: Image): Observable<any>{
    let json = JSON.stringify(image);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url+'image/'+id, params, {headers: headers});

  }

  deleteImage(id:string): Observable<any>{

    return this._http.delete(this.url+'image/'+id);
  }

}
