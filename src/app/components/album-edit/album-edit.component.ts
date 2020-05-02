import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';


@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css'],
  providers: [AlbumService]
})
export class AlbumEditComponent implements OnInit {
  album:Album;

  constructor(private _albumService: AlbumService,
              private _route: ActivatedRoute,
              private _router:Router) { }

  ngOnInit(): void {
    this.album = new Album("","","");
    this.getAlbum();
  }

  //Obtenermos los datos del registro
  getAlbum(){
    this._route.params.subscribe(params =>{

    let id = params['id'];

    this._albumService.getAlbum(id).subscribe(
      result => {

        if(!result.album){

          this._router.navigate(['/']);

        }else{

          this.album = result.album;
          console.log(result);

        }
      },
      err => {
        console.log(<any>err);
      }
    )
   });
  }

//Actualizamos el registro
  onSubmit(){
    this._route.params.subscribe(params =>{

      let id = params['id'];

      this._albumService.editAlbum(id, this.album).subscribe(
        result => {

          if(!result.album){

            this._router.navigate(['/']);

          }else{

            this.album = result.album;
            this._router.navigate(['/', this.album._id]);
            console.log(result);

          }
        },
        err => {
          console.log(<any>err);
        }
      )
    });
  }
}
