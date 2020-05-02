import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../../services/global'
import { Image } from '../../models/image';

@Component({
  selector: 'app-image-edit',
  templateUrl: '../image-add/image-add.component.html',
  styleUrls: ['../image-add/image-add.component.css'],
  providers: [ImageService]
})
export class ImageEditComponent implements OnInit {

  public title: string;
  public image: Image;
  //public is_edit: boolean;

  constructor(private _imageService:ImageService,
              private _router: Router,
              private _route: ActivatedRoute) {
                this.title = 'Editar imagen';
                //this.is_edit = true;
              }

  ngOnInit() {
    this.image = new Image("","","","");
    this.getImage();
  }

  getImage(){

    this._route.params.subscribe(params =>{

      let id = params['id'];

      this._imageService.getImage(id).subscribe(
        res => {
          this.image = res.image;

          if(!res.image){
            this._router.navigate(['/']);
          }
        },
        err => {
          console.log(err);
      });
    });

  }

  onSubmit(){
    this._route.params.subscribe(params =>{

      let id = params['id'];

      this._imageService.editImage(id, this.image).subscribe(
        res => {
          this.image = res.image;

          if(!res.image){
            alert('Error en el servidor')
          }else{
            //Validando la propiedad this.filesToUpload
            if(!this.filesToUpload){
              this._router.navigate(['/album', this.image.album]);
            }else{
              //Subir la imagen
              this.makeFileRequest(GLOBAL.url+'upload-image/'+id, [], this.filesToUpload)
              .then(
                (res) => {
                  this.resultUpload = res;
                  this.image.picture = this.filesToUpload.filename;
                  this._router.navigate(['/album', this.image.album]);
                },
                (err) => {
                  console.log(err);
                });
            }

          }


        },
        err => {
          console.log(err);

        });
    });
  }

  public filesToUpload: Array<File>;
  public resultUpload;

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url:string, params: Array<string>, files: Array<File>){
    return new Promise(function(resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i=0; i<files.length; i++){
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 ){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response)
          }
        }
      }

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }


}
