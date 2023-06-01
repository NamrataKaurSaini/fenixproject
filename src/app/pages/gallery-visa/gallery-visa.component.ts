import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-gallery-visa',
  templateUrl: './gallery-visa.component.html',
  styleUrls: ['./gallery-visa.component.css']
})
export class GalleryVisaComponent {

  galleryList: any[] = []

  constructor(
    private dbService: DbService
  ){}

  ngOnInit(): void {
    this.getInitialData()
  }

  getInitialData() {
    let sub = this.dbService.homeGallerySubject.subscribe((value) => {
      if(value.length !== 0) {
        this.galleryList = [...value];
        this.dbService.getGalleryImages();
        this.dbService.getWindowRef().setTimeout(() => sub.unsubscribe(), this.dbService.timeoutInterval * 6) // 60 seconds
      }
    })
  }

  // getRemainingData() {
  //   this.dbService.getAllGalleryImages();
  //   let sub = this.dbService.gallerySubject.subscribe((value) => {
  //     if(value.length !== 0) {
  //       this.galleryList = this.galleryList.concat(value);
  //       this.dbService.getWindowRef().setTimeout(() => sub.unsubscribe(), this.dbService.timeoutInterval * 6)
  //     }
  //   })
  // }
}
