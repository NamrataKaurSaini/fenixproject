import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { 
  collection, CollectionReference, doc, 
  DocumentData, Firestore, getDoc, getDocs, limit, onSnapshot, 
  orderBy, Query, query, QueryDocumentSnapshot, startAfter, updateDoc, where, increment
} from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import * as CONSTANTS from '../constants';
import { ContactModel } from '../modals/contact-model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  backgroundBg: string[] = [
    "#D91A731A",
    "#3B8DBF1A",
    "#90BF2A1A",
    "#D949291A",
    "#FCB6671A",
    "#8741821A",
    "#24AEA71A",
    "#0E923F1A"
  ];

  // Navigation Data
    servicesModelSubject = new BehaviorSubject<any[]>([]);

  //Footer Content
    addressModelSubject = new BehaviorSubject<any>(null);

  // Social Link, Quote
    socialSubject = new BehaviorSubject<any>(null);

  // Visa with LastDoc
    homeVisaSubject = new BehaviorSubject<any[]>([]);
    visaSubject = new BehaviorSubject<any[]>([]);
    visaLastDoc = new BehaviorSubject<QueryDocumentSnapshot<DocumentData> | null>(null);

  // Service with LastDoc
    homeServiceSubject = new BehaviorSubject<any[]>([]);
    serviceSubject = new BehaviorSubject<any[]>([]);
    serviceLastDoc = new BehaviorSubject<QueryDocumentSnapshot<DocumentData> | null>(null);
  
  // Gallery with LastDoc
    homeGallerySubject = new BehaviorSubject<any[]>([])
    gallerySubject = new BehaviorSubject<any[]>([]);
    galleryLastDoc = new BehaviorSubject<QueryDocumentSnapshot<DocumentData> | null>(null);

  // Testimonials with LastDoc
    testimonialSubject = new BehaviorSubject<any[]>([]);
    testimonialLastDoc = new BehaviorSubject<QueryDocumentSnapshot<DocumentData> | null>(null);
  
  // blogRetrieved: boolean = false;
    $HOME_DOC_LIMIT: number = 3;
    $DOC_LIMIT: number = 3;

  // Load More Bools for various sections
    isImagesAvailable: boolean = true
    isVisasAvailable: boolean = true;
    isServicesAvailable: boolean = true;
    isTestimonialsAvailable: boolean = true;

  constructor(
    @Inject(DOCUMENT) private _doc: Document,
    private firestore: Firestore,
    public sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) { 
    this.getSocialUrl();
    this.getAllServices();
    this.getHomeServices()
    this.getAllVisas()
    this.getHomeVisas()
    this.getHomeGallery()
    this.getAllGalleryImages()
    this.getTestimonials()
    this.getAddress()
  }
  getWindowRef = (): Window => this._doc.defaultView as Window;
  getCollectionRef = (collectionName: string): CollectionReference<DocumentData> => collection(this.firestore, collectionName);
  getQueryRef(collectionName: string, whereKey: string, orderByKey: string, isDescOrder: boolean = false): Query<DocumentData> {
    let queryRef: Query = query(
      this.getCollectionRef(collectionName),
      where(whereKey, '==', true),
      orderBy(orderByKey, isDescOrder ? 'desc' : 'asc')
    );
    return queryRef;    
  }

  public get timeoutInterval() {
    return 10000;
  }

  public onLoad() {
    this.getAllServices();
    this.getAllVisas()
  }

    // Get Gallery Data for Home Page and Sub Page
  getHomeGallery() {
    let queryRef = query(
      this.getQueryRef(CONSTANTS.GALLERY_COLLECTION, 'galleryStatus', 'addedOn', true),
      limit(this.$HOME_DOC_LIMIT)
    );
  
    const unsub = onSnapshot(queryRef, (snapshot) => {
      this.isImagesAvailable = snapshot.size === this.$HOME_DOC_LIMIT
      this.homeGallerySubject.next(snapshot.docs.map((ele) => {
        this.galleryLastDoc.next(ele);
        return ele.data();
      }));
      this.getWindowRef().setTimeout(() => unsub(), this.timeoutInterval * 6);
    })
  }

  getAllGalleryImages() {
    let lastDoc = this.galleryLastDoc.value;
    let queryRef = query(
      this.getQueryRef(CONSTANTS.GALLERY_COLLECTION, 'galleryStatus', 'addedOn', true),
      startAfter(lastDoc)
    );

    const unsub = onSnapshot(queryRef, (snapshot) => {
      this.gallerySubject.next(snapshot.docs.map(e => e.data()));
      this.getWindowRef().setTimeout(() => unsub(), this.timeoutInterval * 6);
    })
  }

  async getSocialUrl() {
    let docRef = await getDoc(doc(this.getCollectionRef(CONSTANTS.SOCIAL_COLLECTION), CONSTANTS.SOCIAL_COLLECTION));
    this.socialSubject.next(docRef.data());
  }

  getHomeVisas() {
    let queryRef = query(
      this.getQueryRef(CONSTANTS.VISAS_COLLECTION, 'visaStatus', 'addedOn', true),
      limit(this.$HOME_DOC_LIMIT)
    );

    const unsub = onSnapshot(queryRef, (snapshot) => {
      this.isVisasAvailable = snapshot.size === this.$HOME_DOC_LIMIT
      this.homeVisaSubject.next(snapshot.docs.map((ele) => {
        this.visaLastDoc.next(ele);
        return ele.data();
      }));
      this.getWindowRef().setTimeout(() => unsub(), this.timeoutInterval * 6);
    })
  }
  
  getAllServices() {
    let queryRef = query(
      this.getQueryRef(CONSTANTS.SERVICES_COLLECTION, 'serviceStatus', 'addedOn', true),
      limit(this.$DOC_LIMIT)
    );

    const unsub = onSnapshot(queryRef, (snapshot) => {
      this.isServicesAvailable = snapshot.size === this.$HOME_DOC_LIMIT
      this.serviceSubject.next(snapshot.docs.map((ele) => {
        this.serviceLastDoc.next(ele);
        return ele.data();
      }));
      this.getWindowRef().setTimeout(() => unsub(), this.timeoutInterval * 6);
    })
  }
  getHomeServices() {
    let queryRef = query(
      this.getQueryRef(CONSTANTS.SERVICES_COLLECTION, 'serviceStatus', 'addedOn', true),
      limit(this.$HOME_DOC_LIMIT)
    );

    const unsub = onSnapshot(queryRef, (snapshot) => {
      this.isServicesAvailable = snapshot.size === this.$HOME_DOC_LIMIT
      this.homeServiceSubject.next(snapshot.docs.map((ele) => {
        this.serviceLastDoc.next(ele);
        return ele.data();
      }));
      this.getWindowRef().setTimeout(() => unsub(), this.timeoutInterval * 6);
    })
  }

  getAllVisas() {
    let queryRef = query(
      this.getQueryRef(CONSTANTS.VISAS_COLLECTION, 'visaStatus', 'addedOn', true),
      limit(this.$DOC_LIMIT)
    );

    const unsub = onSnapshot(queryRef, (snapshot) => {
      this.isVisasAvailable = snapshot.size === this.$HOME_DOC_LIMIT
      this.visaSubject.next(snapshot.docs.map((ele) => {
        this.visaLastDoc.next(ele);
        return ele.data();
      }));
      this.getWindowRef().setTimeout(() => unsub(), this.timeoutInterval * 6);
    })
  }

  getTestimonials(){
    let queryRef = query(
      this.getQueryRef(CONSTANTS.REVIEWS_COLLECTION,'reviewStatus','addedOn', true),
      limit(this.$DOC_LIMIT)
    )

    const unsub = onSnapshot(queryRef, (snapshot) => {
      this.isTestimonialsAvailable = snapshot.size === this.$DOC_LIMIT
      this.testimonialSubject.next(snapshot.docs.map((ele) => {
        this.testimonialLastDoc.next(ele)
        return ele.data()
      }))
      this.getWindowRef().setTimeout(() => unsub(), this.timeoutInterval * 6)
    })
  }

  getAddress(){
    let unsub = onSnapshot(this.getQueryRef(CONSTANTS.CONTACT_COLLECTION,'contactStatus','addedOn'), (snapshot) => {
      let list = snapshot.docs.map(e => {
        let data = { ...e.data() as ContactModel }
        return {
          ...data,
          addressUrlId: data.title?.toLowerCase().replace(/ /g, '-')
        }
      })
      this.addressModelSubject.next(list.filter(x => x.address))
      this.getWindowRef().setTimeout(() => unsub(),this.timeoutInterval*6)
    })
  }
}