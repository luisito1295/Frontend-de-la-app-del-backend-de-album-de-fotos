import { Component, OnInit } from '@angular/core';

import { Image } from '../../models/image';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
  providers: [ImageService]
})
export class ImageAddComponent implements OnInit {

  public title:string;
  public image:Image;
  //public is_edit:boolean;

  constructor(private _imagaService:ImageService,
              private _router: Router,
              private _route: ActivatedRoute) {
                this.title = 'Añadir imagen';
                //this.is_edit = false;
              }

  ngOnInit() {
    this.image = new Image("","","","");
  }

  onSubmit(){
    this._route.params.subscribe(params =>{

      let album_id = params['album'];
      this.image.album = album_id;

      this._imagaService.addImage(this.image).subscribe(
        res => {
          this.image = res.image;

          if(!res.image){
            alert('Error en el servidor')
          }else{
            this._router.navigate(['/editar-imagen', res.image._id]);
          }

        },
        err => {
          console.log(err);

        });
    });
  }

}
