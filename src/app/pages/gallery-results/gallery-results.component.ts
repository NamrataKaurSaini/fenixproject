import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-gallery-results',
  templateUrl: './gallery-results.component.html',
  styleUrls: ['./gallery-results.component.css']
})
export class GalleryResultsComponent {

  galleryList: any[] = []

  constructor(
    private dbService: DbService
  ){}

  ngOnInit(): void {
    this.getInitialData()
  }

  getInitialData() {
    let sub = this.dbService.resultGallerySubject.subscribe((value) => {
      if(value.length !== 0) {
        this.galleryList = [...value];
        this.dbService.getResultGallery();
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
