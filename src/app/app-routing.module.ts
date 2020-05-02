import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumAddComponent } from './components/album-add/album-add.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';

//Componentes

const routes: Routes = [
  {path: '', component: AlbumListComponent},
  {path: 'home', component: AlbumListComponent},
  {path: 'album/:id', component: AlbumDetailComponent},
  {path: 'editar-album/:id', component: AlbumEditComponent},
  {path: 'crear-album', component: AlbumAddComponent},
  {path: 'crear-imagen/:album', component: ImageAddComponent},
  {path: 'editar-imagen/:id', component: ImageEditComponent},
  {path: 'imagen/:id', component: ImageDetailComponent},
  {path: '**', component: AlbumListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
