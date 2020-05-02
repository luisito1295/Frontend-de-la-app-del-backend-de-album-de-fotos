import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
  providers: [AlbumListComponent]
})
export class AlbumListComponent implements OnInit {

  public title:string;
  public albums: Album[];
  public loading: boolean;
  public confirmado;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _albumService: AlbumService) {
                this.loading = true;
              }

  ngOnInit() {
    this.getAlbums();
  }



  getAlbums(){
    this.loading = false;
    this._albumService.getAlbums().subscribe(
      res => {
        console.log(res);
        this.albums = res.albums;
        if(!this.albums){
          alert('Error en la peticion');
        }
      },
      err => {
        console.log(<any>err);
        alert('Error');
      }
    )
  }

  borrarAlbum(id){
    this._albumService.deleteAlbum(id).subscribe(
    res => {
      if(!res.album){
        alert('Error en el servidor');
      }
      this.getAlbums();

    },
    err => {
      console.log(<any>err);
    }
    );
  }

  onDeleteConfirm(id){
    this.confirmado = id;
    this.getAlbums();
  }

  onCancelConfirm(id){
    this.confirmado = null;
    this.getAlbums();
  }

  refresh(): void {
    window.location.reload();
  }

}
