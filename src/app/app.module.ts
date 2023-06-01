import { APP_INITIALIZER,NgModule } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DbService } from './services/db.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { GalleryInstituteComponent } from './pages/gallery-institute/gallery-institute.component';
import { GalleryResultsComponent } from './pages/gallery-results/gallery-results.component';
import { GalleryVisaComponent } from './pages/gallery-visa/gallery-visa.component';

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
    GalleryInstituteComponent,
    GalleryResultsComponent,
    GalleryVisaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  providers: [
    DbService,
    { 
      provide: APP_INITIALIZER,
      useFactory: function(dbService: DbService) {
        return () => dbService.onLoad();
      },
      deps: [DbService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
