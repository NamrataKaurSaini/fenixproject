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
  mainAddress: ContactModel = {}
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

    let contactSub = this.dbService.addressModelSubject.subscribe((data) => {
      if (data != null) {
        data = data.map((e: any) => ({
          ...e,
          urlSafe: this.dbService.sanitizer.bypassSecurityTrustResourceUrl(e!.mapLink ?? "")
        }))
        // this.contactModelList = data.filter(x => !x.mainBranch).map(e => e);
        this.dbService.getWindowRef().setTimeout(() => contactSub.unsubscribe(), this.dbService.timeoutInterval);
      }
    });

    let mainAddressSub = this.dbService.addressModelSubject.subscribe(data => {
      if(data !== null) {
        this.mainAddress = { ...data }
        this.mapLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.mainAddress?.mapLink ?? "");
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
