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
  
  enquiryForm: FormGroup = new FormGroup({});
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
    this.initEnquiryForm()
  }

  async onSubmitEnquiry() {
    if(this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    if(this.selectedServices.length === 0) {
      this.toast.warning("Please select atleat 1 service", "")
      return;
    }
    let values = { ...this.enquiryForm.value };
    values.services = [...this.selectedServices];

    let docRef = doc(this.firestore, `enquries/${values.appointmentId}`);
    setDoc(docRef, { ...values }, { merge: true})
      .then(() => {
        if(this.inModalBool) this.modal.dismissAll();
        this.toast.success("Enquiry Submitted", "Success");
        this.initEnquiryForm();
      }, (error) => {
        if(this.inModalBool) this.modal.dismissAll();
        this.toast.error("Something went wrong", "Failed")
        return true;
      });
  }

  initEnquiryForm() {
    this.selectedServices = ["IELTS"];
    this.enquiryForm = this.fb.group({
      appointmentId: [doc(collection(this.firestore, 'enquries')).id],
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]{10}$")]],
      email: ["", [Validators.required, Validators.email]],
      timestamp: [Timestamp.now()],
      message: [""],
      requestCallback: [true],
    });
  }
  
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
