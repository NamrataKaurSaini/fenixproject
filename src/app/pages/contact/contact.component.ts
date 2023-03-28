import { Component } from '@angular/core';
import { CollectionReference,DocumentData,doc,Timestamp,setDoc } from '@angular/fire/firestore';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ContactModel } from 'src/app/modals/contact-model';
import { DbService } from 'src/app/services/db.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr'
import { QUERIES_COLLECTION } from 'src/app/constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  queryForm: FormGroup = new FormGroup({})
  formSubmitted: boolean = false

  contactModel: ContactModel = {};  
  contactList: ContactModel[] = [];

  contactModelList: ContactModel[] = [];
  mainAddress: any = {}
  mapLink!: SafeResourceUrl;

  collectionRef!: CollectionReference<DocumentData>

  constructor(
    private fb: FormBuilder,
    public dbService: DbService,
    private domSanitizer: DomSanitizer,
    private toast: ToastrService
  ){}

  getMapLink(url: string){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url)
  }

  ngOnInit(){
    this.collectionRef = this.dbService.getCollectionRef(QUERIES_COLLECTION)
    this.inItForm()
  }

  inItForm(){
    this.queryForm = this.fb.group({
      queryId: [doc(this.collectionRef).id],
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      query: ["", Validators.required],
      date: [Timestamp.now()]
    })

     let mainAddressSub = this.dbService.addressSubject.subscribe(data => {
      if(data !== null) {
        this.mainAddress = { ...data }
        this.mapLink = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13794.60863861456!2d74.5009219!3d30.1899288!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39171783d35787f1%3A0x71b4aff0a6012a4a!2sFenix%20Immigration%20Services!5e0!3m2!1sen!2sin!4v1679997864484!5m2!1sen!2sin");
        this.dbService.getWindowRef().setTimeout(() => mainAddressSub.unsubscribe(), this.dbService.timeoutInterval);
      }
    })
  }

  async onSubmit(event: any) {
    event.preventDefault();
    let values = { ...this.queryForm.value };

    let docRef = doc(this.collectionRef, values.queryId);
    setDoc(docRef, { ...values }, { merge: true })
      .then(() => {
        this.inItForm();
        this.toast.success("Query Submitted", "Success");
      }, (error) => {
        this.inItForm();
        this.toast.error("Unable to submit the form", "Error")
      })
    // await this.dbService.sendQuery(this.queryForm);
    // this.initForm();
  }
  

}
