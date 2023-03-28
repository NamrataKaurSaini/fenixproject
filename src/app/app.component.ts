import { Component } from '@angular/core';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fenixproject';

  social: any = {};

  loader: boolean = true;

  constructor(
    private dbService: DbService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.loader = false;
      this.getSocialUrl();
    }, 1500);
  }
  getSocialUrl() {
    let unsub = this.dbService.socialSubject.subscribe((value) => {
      if(value !== null) {
        this.social = { ...value };
        this.dbService.getWindowRef().setTimeout(() => unsub.unsubscribe(), this.dbService.timeoutInterval * 6)
      }
    })
  }
}