import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import Prescription from "../models/prescription";

@Injectable({
    providedIn: 'root',
  })
  export class PrescriptionService {

    public prescriptions: Prescription[] = [];

    constructor(
        private readonly storageService: StorageService
    ) {}

    public getPrescription(id:string): Prescription | undefined {
        return this.prescriptions.find(x=>x.id == id);
      }

    public getPrescriptions(): Prescription[] {
        let prescriptions = localStorage.getItem('Prescriptions');
        this.prescriptions = prescriptions ? JSON.parse(prescriptions) : [];
        return this.prescriptions;
    }
      
      
      public createPrescription(prescription: Prescription){
        if(!this.prescriptions) this.prescriptions = []
        this.prescriptions.push(prescription);
        this.updatePrescriptions(this.prescriptions)
      }
      public updatePrescriptions(prescriptions: Prescription[]) {
        const prescriptionsJson = JSON.stringify(prescriptions);
        localStorage.removeItem('Prescriptions')
        localStorage.setItem('Prescriptions', prescriptionsJson);
      }
      public updatePrescription(prescription: Prescription) {
        let index = this.prescriptions.findIndex(x=>x.id == prescription.id);
        this.prescriptions[index] = prescription;
        this.updatePrescriptions(this.prescriptions)
      }
  }