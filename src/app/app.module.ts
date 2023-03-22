import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component'; 
import { HomeComponent } from './pages/home/home.component'; 
import { ContactComponent } from './pages/contact/contact.component'; 
import { AboutComponent } from './pages/about/about.component'; 
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VisasComponent } from './pages/visas/visas.component'; 
import { ServicesComponent } from './pages/services/services.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './pages/gallery/gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    AdminLayoutComponent,
    VisasComponent,
    ServicesComponent,
    FooterComponent,
    GalleryComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
