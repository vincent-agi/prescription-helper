import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrescriptionService } from '../services/prescription.service';
import { ActivatedRoute, Router } from '@angular/router';
import Prescription from '../models/prescription';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, FormsModule, ReactiveFormsModule, CommonModule]
})
export class Tab2Page implements OnInit {

  @ViewChild('inputField') inputField!: ElementRef;
  public prescriptionId: any;
  public selectedFile:any;
  public imageURL:any;
  public edit_view: boolean = false;

  public prescriptionForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    dateOfPrescription: new FormControl(Date.now().toString(), Validators.required),
    numberWillUse: new FormControl(1, Validators.required),
    numberOfUsed: new FormControl(0, Validators.required),
    comments: new FormControl(''),
    image: new FormControl('', Validators.required)
  });

  public doctorForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    lastname: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    address: new FormControl(''),
    speciality: new FormControl('', Validators.required),
    phonenumber:new FormControl(''),
  })

  constructor(
    private readonly prescriptionService: PrescriptionService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
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
      let prescription: Prescription | undefined = this.prescriptionService.getPrescription(id);
      if(prescription){
        this.prescriptionForm.get('title')?.setValue(prescription.title);
        this.prescriptionForm.get('dateOfPrescription')?.setValue(prescription.dateOfPrescription);
        this.prescriptionForm.get('numberWillUse')?.setValue(prescription.numberOfUsed);
        this.prescriptionForm.get('numberOfUsed')?.setValue(prescription.numberWillUse);
        this.prescriptionForm.get('comments')?.setValue(prescription.comments);
        this.imageURL = prescription.image
      }
    }
  }
  onSubmit() {
    console.log(this.prescriptionForm.value)
    if (this.prescriptionForm.valid) {
      const title = this.prescriptionForm.get('title')?.value;
      const dateOfPrescription = this.prescriptionForm.get('dateOfPrescription')?.value;
      const numberWillUse = this.prescriptionForm.get('numberWillUse')?.value;
      const numberOfUsed = this.prescriptionForm.get('numberOfUsed')?.value;
      const comments = this.prescriptionForm.get('comments')?.value;
  
      if (this.imageURL) {
        // Handle the image if a new one is selected
          // Create a Beer object
          let prescritpion: Prescription = new Prescription();
          prescritpion.title = title;
          prescritpion.dateOfPrescription = dateOfPrescription;
          prescritpion.numberOfUsed = numberOfUsed;
          prescritpion.numberWillUse = numberWillUse
          prescritpion.comments = comments,
          prescritpion.image = this.imageURL

          if (this.edit_view) {
            this.prescriptionService.updatePrescription(prescritpion);
            this.prescriptionService.getPrescriptions(); 
          } else {
            this.prescriptionService.createPrescription(prescritpion);
          }
          this.router.navigate(['/'])
          this.prescriptionForm.reset();
      } 
    } else {
      console.log('No file selected.');
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
