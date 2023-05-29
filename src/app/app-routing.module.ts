import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { VisasComponent } from './pages/visas/visas.component';
import { GalleryInstituteComponent } from './pages/gallery-institute/gallery-institute.component';
import { GalleryResultsComponent } from './pages/gallery-results/gallery-results.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'visas', component: VisasComponent},
    {path: 'services', component: ServicesComponent} ,
    {path: 'contact', component: ContactComponent},

    {path: 'institute', component: GalleryInstituteComponent},
    {path: 'result', component: GalleryResultsComponent},
    {path: 'gallery', component: GalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
