import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { YathzeeGameComponent } from './yathzee/yathzee-game/yathzee-game.component';
import {LightsoutGameComponent} from './lightsout/lightsout-game/lightsout-game.component';
import {YathzeeLobbyDetailComponent} from './yathzeeLobbyDetail/yathzee-lobby-detail.component';
import {YathzeeLobbyListComponent} from './yathzeeLobbyList/yathzee-lobby-list.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'lightsout/:id', component: LightsoutGameComponent},
  {
    path: 'yathzee',
    children: [
      { path: 'lobbies', component: YathzeeLobbyListComponent },
      { path: 'lobby/:id', component: YathzeeLobbyDetailComponent },
      { path: 'game/:id', component: YathzeeGameComponent }
    ]
  }
];
