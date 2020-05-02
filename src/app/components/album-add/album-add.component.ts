import { Component, OnInit } from '@angular/core';

import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [AlbumService]
})
export class AlbumAddComponent implements OnInit {

  public title:string;
  public album:Album;

  constructor(private _albumService:AlbumService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.title = 'Crear un nuevo album';
    this.album = new Album("","","");
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._albumService.addAlbum(this.album).subscribe(
      res => {
        this.album = res.album;

        if(!this.album){
          alert('Error en aguardar los datos')
        }else{
          this._router.navigate(['/']);
        }

      },
      err => {
        console.log(err);
      }
    )
  }

}
