import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/modals/contact-model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  contactModelList: ContactModel[] = []
  addressInfo: any = {};
  loading: boolean = false;
  social: any = {};

  constructor(
    private dbService: DbService
  ){ }

  ngOnInit(): void {
      this.getData()
  }

  getData() {
    let addressSub = this.dbService.addressSubject.subscribe((data: any) => {
      if (data != null) {
        this.loading = false;
        this.addressInfo = data;        
        this.dbService.getWindowRef().setTimeout(() => addressSub.unsubscribe(), this.dbService.timeoutInterval)
      }
    });

    let sub = this.dbService.socialSubject.subscribe((data) => {
      if(data !== null) {
        this.social = { ...data }
        this.dbService.getWindowRef().setTimeout(() => sub.unsubscribe(), this.dbService.timeoutInterval)
      }
    });
  }
}
