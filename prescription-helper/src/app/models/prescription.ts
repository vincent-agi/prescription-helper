import { Helpers } from "../services/helpers.service";
import Doctor from "./doctor";

export default class Prescription {

    private readonly helpers: Helpers = new Helpers()

    id: string = ""; // unique id of prescription. Will generated using `generateGUUID function from helpers.service.ts`
    title: string = ""; // Title of your presction
    dateOfPrescription: Date = new Date(); // Date at presction is set
    numberWillUse: number = 1; // number of prescription can be used. by default 1 because we use presctipion at least one time
    doctor: Doctor | undefined; // You can link a doctor to you prescription.
    numberOfUsed: number = 0; // number time prescription has been used. By default 0.
    comments: string = ""; // let possibility to the user make comments about his prescription to add more details.
    image: string = ""; // photo of precription

    constructor(
        // Helpers service is use for generate GUUID of objects
        
        ) {
        // Auto generate unique object ID
        this.id = this.helpers.generateGUUID();
    }

    /**
     * getId return GUUID of current prescription
     */
    public getId(): string {
        return this.id;
    }

    /*
    * setTitle give permission to user let title to his prescription
    */
    public setTitle(title: string): any {
        this.title = title;
        return this;
    }

    /*
    * getTitle return title of current prescription
    */
    public getTitle(): string {
        return this.title;
    }

    /*
    * setDateOfPrescriptiion give permission to user set date of prescription was prescrited
    */
    public setDateOfPrescription(date: Date): any {
        this.dateOfPrescription = date;
        return this;
    }

    /*
    * getDateOfPrescriptiion return date when prescription was registred (by default) or prescripted when user register it
    */
    public getDateOfPrescription(): Date {
        return this.dateOfPrescription;
    }

    /*
    * setNumberWillUse give to user permission to set number of time prescription will used. In renew case
    */
    public setNumberWillUse(willUse: number): any | never {
    if (willUse < 1 || willUse > 12) {
        alert("Number of use must be between 0 and 12");
        throw new Error("Number of use must be between 0 and 12");
    }
    this.numberWillUse = willUse;
    return this;
   }

   /*
   * getNumberWillUse return the number of time prescription can be use. 
   * By default 1
   * Maximum 12
   * Minimum 1
   */
   public getNumberWillUse(): number {
        return this.numberWillUse;
    }

   /*
   * setDoctor allow user to link his prescription to a doctor 
   */
   public setDoctor(doctor?: Doctor): any | never {
        if(doctor) {
            this.doctor = doctor;
            return this;
        }
        alert("To set a doctor you mus tregister one");
        throw new Error("To set a doctor you mus tregister one");
    }

    /*
    * getDoctor return the doctor linked to this prescription
    * Can be undefined
    */
    public getDoctor(): Doctor | undefined {
        return this.doctor
    }

  /*
  * setNumberOfUsed
  */
  public setNumberOfUsed(used: number): any | never {
    if(used < 0 || used > 12) {
        alert("number of used must be between 0 and 12");
        throw new Error("number of used must be between 0 and 12");
    }
    this.numberOfUsed = used;
    return this;
  }

  /*
  * getNumberOfUsed return the number of time prescription was used
  * by default 0
  * Minimum 0
  * Maximum 12
  */
  public getNumberOfUsed(): number {
        return this.numberOfUsed;
    }

  /*
  * setComments allow user to let a comment about his prescription
  */
  public setComments(comments: string): any {
    this.comments = comments;
    return this;
  }

  /*
  * getComments return comments about this prescription
  */
  public getComments(): string {
        return this.comments;
    }
}