import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../models/album';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public url:string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAlbums(): Observable<any>{
    return this._http.get(this.url+'albums');
  }

  getAlbum(id: string): Observable<any>{
    return this._http.get(this.url+'album/'+id);
  }

  addAlbum(album: Album): Observable<any>{
    let json = JSON.stringify(album);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'album', params, {headers: headers});
  }

  editAlbum(id: string, album: Album): Observable<any>{
    let json = JSON.stringify(album);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.put(this.url+'album/'+id, params, {headers: headers});
  }

  deleteAlbum(id:string): Observable<any>{

    return this._http.delete(this.url+'album/'+id);

  }


}
