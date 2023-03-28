import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, doc, Firestore, setDoc, Timestamp } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() inModalBool: boolean = false;
  
  enquiryForm!: FormGroup
  galleryList: any[] = [];
  reviewsList: any[] = [];
  servicesList: any[] = [];
  visaList: any[] = []

  selectedServices: string[] = [];

  constructor(
    public dbService: DbService,
    private fb: FormBuilder,
    public modal: NgbModal,
    private firestore: Firestore,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDataFromDbService()
    // this.initEnquiryForm()
    this.enquiryForm = this.fb.group
    ({
      enqueryId: [doc(collection(this.firestore, "enqueries")).id],
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ["",[Validators.required, Validators.email] ],
      phone: [""]
    })
  }

  async onSubmitEnquiry() {

    let values = { ...this.enquiryForm.value };

    let docRef = doc(this.firestore, `enqueries/${values.enqueryId}`);
    setDoc(docRef, { ...values })
      .then(() => {
        this.toast.success("Enquiry Submitted", "Success");
        console.log(values)
        this.enquiryForm.reset()
        // this.initEnquiryForm();
      }, (error) => {
        this.toast.error("Something went wrong", "Failed")
        return true;
      });
  }

  // initEnquiryForm() {
  //   this.enquiryForm = this.fb.group({
  //     name: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
  //     phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]{10}$")]],
  //     email: ["", [Validators.required, Validators.email]],
  //     timestamp: [Timestamp.now()],
  //   });
  // }
  
  getDataFromDbService(){

    let visaSub = this.dbService.homeVisaSubject.subscribe((value) => {
      if(value.length !== 0){
        this.visaList = value
        this.dbService.getWindowRef().setTimeout(() => visaSub.unsubscribe(), this.dbService.timeoutInterval*60)
      }
    })

    let serviceSub = this.dbService.homeServiceSubject.subscribe((value) =>{
      if(value.length !== 0){
        this.servicesList = value
        this.dbService.getWindowRef().setTimeout(() => serviceSub.unsubscribe(), this.dbService.timeoutInterval*60)
      }
    })
  }
}
