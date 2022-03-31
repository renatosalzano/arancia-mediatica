import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, IsLogged } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { UserComponent } from './features/user/user.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { LoginComponent } from './features/login/login.component';
import { MoviesComponent } from './features/movies/movies.component';
import { MusicComponent } from './features/music/music.component';
import { SeriesComponent } from './features/series/series.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { CheckViewportSizeService } from './service/check-viewport-size.service';
import { UserInfoService } from './service/user-info.service';
import { BooksComponent } from './features/books/books.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormComponent } from './layout/dynamic-form/dynamic-form.component';
import { ApiEndpointService } from './service/api-endpoint.service';
import { FooterComponent } from './features/footer/footer.component';
import { UserButtonComponent } from './layout/user-button/user-button.component';
import { ItemButtonComponent } from './layout/item-button/item-button.component';
import { ItemComponent } from './layout/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    MoviesComponent,
    MusicComponent,
    SeriesComponent,
    BooksComponent,
    DynamicFormComponent,
    FooterComponent,
    UserButtonComponent,
    ItemButtonComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    IsLogged,
    CheckViewportSizeService,
    UserInfoService,
    ApiEndpointService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
