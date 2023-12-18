import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrescriptionService } from '../services/prescription.service';
import { ActivatedRoute, Router } from '@angular/router';
import Prescription from '../models/prescription';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, 
    ExploreContainerComponent, CommonModule, FormsModule]
})
export class Tab2Page implements OnInit {

  @ViewChild('inputField') inputField!: ElementRef;
  public prescriptionId: any;
  public selectedFile:any;
  public imageURL:any;
  public edit_view: boolean = false;

  public prescription: Prescription | undefined = new Prescription();

    prescriptionTitle: string = "";
    dateOfPrescription: Date = new Date();
    prescriptionNumberWillUse: number = 1;
    prescriptionNumberOfUsed: number = 0;
    prescriptionComments: string = "";

    doctorLastname: string = "";
    doctorFirstname: string = "";
    doctorAddress: string = "";
    doctorSpeciality: string = ""
    doctorPhonenumber: string = "";

  constructor(
    private readonly prescriptionService: PrescriptionService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    delete this.prescription;
    this.getData()
  }
  ionViewDidEnter(): void {
    this.getData()
  }
  getData(){
    const id = this.route.snapshot.paramMap.get('id');
    this.prescriptionId = id
    if(id && id!=null){
      this.edit_view = true;
      this.prescription = this.prescriptionService.getPrescription(id);
      if(this.prescription){
        this.imageURL = this.prescription.image
      }
      this.prescriptionTitle = this.prescription?.title ?? "";
      this.dateOfPrescription = this.prescription?.dateOfPrescription ?? new Date();
      this.prescriptionNumberWillUse = this.prescription?.numberWillUse ?? 1;
      this.prescriptionNumberOfUsed = this.prescription?.numberOfUsed ?? 0;
      this.prescriptionComments = this.prescription?.comments ?? "";
    }
  }
  onSubmit() {
    if(!this.prescription) {
      this.prescription = new Prescription();
    }
    if (this.imageURL) {
      // Handle the image if a new one is selected
      // Create a Beer object
      this.prescription.title = this.prescriptionTitle;
      this.prescription.dateOfPrescription = this.dateOfPrescription;
      this.prescription.numberOfUsed = this.prescriptionNumberOfUsed;
      this.prescription.numberWillUse = this.prescriptionNumberWillUse
      this.prescription.comments = this.prescriptionComments,
      this.prescription.image = this.imageURL

      if (this.edit_view) {
        this.prescriptionService.updatePrescription(this.prescription);
        this.prescriptionService.getPrescriptions(); 
      }
      else {
        this.prescriptionService.createPrescription(this.prescription);
      }
        this.router.navigate(['/'])
    } else {
      alert('No file selected.');
    }
  }
  onImageUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      // You can handle the uploaded file here, e.g., send it to a server or display it.
      const newImage = inputElement.files[0];
      // Update imageURL with the new image URL or perform other actions.
      // For example, you can display the new image using a FileReader.
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.imageURL = e.target.result as string;
      };
      reader.readAsDataURL(newImage);
    }
  }
}
