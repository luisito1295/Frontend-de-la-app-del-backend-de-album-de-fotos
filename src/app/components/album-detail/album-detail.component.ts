import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../../services/album.service'
import { ImageService } from '../../services/image.service'
import { Album } from 'src/app/models/album';
import { Image } from 'src/app/models/image';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-component-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  providers : [AlbumService, ImageService ]
})
export class AlbumDetailComponent implements OnInit {

  public title:string;
  public apiUrl:string;
  public album:Album;
  public images:Image[];

  constructor(private _route: ActivatedRoute,
              private _router:Router,
              private _albumService: AlbumService,
              private _imageService: ImageService,) { }

  ngOnInit() {
    this.apiUrl = this._imageService.getApiUrl('get-image/');
    //alert(this.apiUrl);
    this.getAlbum();

  }

  getAlbum(){
    this._route.params.subscribe(params =>{

      let id = params['id'];

      this._albumService.getAlbum(id).subscribe(
        result => {

          this.album = result.album;

          if(!result.album){

            this._router.navigate(['/']);

          }else{
            //Llamada al metodo del servicio imagenes
            this._imageService.getImages(result.album._id)
            .subscribe(
              res =>{
                this.images = res.images;
                if(!this.images){
                  //alert('Sin imagenes');
                }
              }, err => {
                console.log(err);
              });

          }
        },
        err => {
          console.log(<any>err);
        }
      )

    });
  }

}
