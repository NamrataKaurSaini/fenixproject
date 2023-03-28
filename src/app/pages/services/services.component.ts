import { Component,OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{

  servicesList: any[] = []
  serviceModelList: any[] = []
  testimonialList: any[] = []

  constructor(
    private dbService: DbService
  ){ }

  ngOnInit(): void {
    this.getInitialData()
    this.getTestimonials()
  }

  getInitialData() {
    let sub = this.dbService.homeServiceSubject.subscribe((value) => {
      if(value.length !== 0) {
        this.servicesList = [...value];
        this.getRemainingData();
        this.dbService.getWindowRef().setTimeout(() => sub.unsubscribe(), this.dbService.timeoutInterval * 6) // 60 seconds
      }
    })
  }

  getRemainingData() {
    this.dbService.getAllServices();
    let sub = this.dbService.serviceSubject.subscribe((value) => {
      if(value.length !== 0) {
        this.servicesList = this.servicesList.concat(value);
        this.dbService.getWindowRef().setTimeout(() => sub.unsubscribe(), this.dbService.timeoutInterval * 6)
      }
    })
  }

  getTestimonials() {
    this.dbService.getTestimonials();
    let sub = this.dbService.testimonialSubject.subscribe((value) => {
      if(value.length !== 0) {
        this.testimonialList = this.testimonialList.concat(value);
        this.dbService.getWindowRef().setTimeout(() => sub.unsubscribe(), this.dbService.timeoutInterval * 6)
      }
    })
  }
}
