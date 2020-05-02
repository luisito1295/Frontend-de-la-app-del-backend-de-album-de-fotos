import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ImageService } from '../../services/image.service'
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
  providers:[ImageService]
})
export class ImageDetailComponent implements OnInit {

  public apiUrl: string;
  public image: Image;
  public loading: boolean;

  constructor(private _route: ActivatedRoute,
              private _router:Router,
              private _imageService: ImageService,) { }

  ngOnInit() {
    this.apiUrl = this._imageService.getApiUrl('get-image/');
    //alert(this.apiUrl);
    //this.loading = true;
    this.getImage();

  }

  getImage(){
    this._route.params.subscribe(params =>{

      let id = params['id'];

      this._imageService.getImage(id).subscribe(
        result => {

          this.image = result.image;
          console.log(result);

          /*if(!result.album){

            this._router.navigate(['/']);

          }*/

        },
        err => {
          console.log(<any>err);
        }
      )

    });
  }

  borrarAlbum(id){
    this._imageService.deleteImage(id).subscribe(
    res => {
      if(!res.album){
        //alert('Error en el servidor');
      }
      //this.getImage();
      this._router.navigate(['/album', this.image.album]);

    },
    err => {
      console.log(<any>err);
    }
    );
  }

  public confirmado;
  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelConfirm(id){
    this.confirmado = null;
  }




}
