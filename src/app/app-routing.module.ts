import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Game2048Component} from './game2048/game2048.component';
const routes: Routes = [
  { path: '',
    redirectTo: '/game',
    pathMatch: 'full'
  },
  { path: 'game', component: Game2048Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
