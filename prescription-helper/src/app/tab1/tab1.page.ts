import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { PrescriptionService } from '../services/prescription.service';
import { ActivatedRoute, Router } from '@angular/router';
import Prescription from '../models/prescription';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule],
})
export class Tab1Page implements OnInit {

  public prescriptions: Prescription[] = [];

  constructor(public prescriptionService: PrescriptionService,private router:Router,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getPrescriptions()
  }
  ionViewDidEnter(): void {
    this.getPrescriptions()
  }
  getPrescriptions(){
    this.prescriptions = this.prescriptionService.getPrescriptions();
  }
  
  deletePrescription(id:string){
    if(confirm('Are you sure you want delete this beer')){
      this.prescriptions = this.prescriptions.filter((x:any)=>x.id != id);
      this.prescriptionService.updatePrescriptions(this.prescriptions);
    }
    
  }
  update(id:string){
    this.router.navigate(['add-presctiption/'+id])
  }
}
