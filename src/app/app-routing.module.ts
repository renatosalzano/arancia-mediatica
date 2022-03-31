import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserComponent } from './features/user/user.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuardService } from './core/auth/guards/auth-guard.service';
import { Oauth2Guard } from './core/auth/guards/oauth2.guard';
import { SeriesComponent } from './features/series/series.component';
import { MoviesComponent } from './features/movies/movies.component';
import { MusicComponent } from './features/music/music.component';
import { BooksComponent } from './features/books/books.component';
import { Injectable } from '@angular/core';
import { AuthService } from './core/auth/services/auth.service';
import { CognitoAuthService } from './core/auth/services/cognito/cognito-auth.service';

@Injectable()
export class IsLogged {
  constructor(private router: Router, private cognito: CognitoAuthService) {}

  async resolve() {
    const isAuth = await this.cognito.isAuthenticated();
    if (!isAuth) this.router.navigate(['/home']);
  }
}

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent, resolve: [IsLogged] },
  { path: 'login', component: LoginComponent, resolve: [IsLogged] },
  { path: 'books', component: BooksComponent, resolve: [IsLogged] },
  { path: 'series', component: SeriesComponent, resolve: [IsLogged] },
  { path: 'movies', component: MoviesComponent, resolve: [IsLogged] },
  { path: 'music', component: MusicComponent, resolve: [IsLogged] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },

  /*{ loadChildren: () => import('../features/books/books.module').then(m => m.BooksModule)},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
