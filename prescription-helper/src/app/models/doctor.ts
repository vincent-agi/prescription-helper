import { Helpers } from "../services/helpers.service";

export default class Doctor {

    id: string = ""; // Unique identifiant of object
    lastname: string = ""; // doctor lastname
    firstname: string = ""; // doctor firstname
    address?: string = ""; // doctor address (can input as you want like only city)
    speciality: string = ""; // add doctor speciality (for example: "general medicine" or "surgeon")
    phonenumber?:string = ""; // can add doctor phone number for emmergency

    constructor(
        // Helpers service is use for generate GUUID of objects
        private readonly helpers: Helpers
    ) {
        // auto generate unique object ID
        this.id = this.helpers.generateGUUID();
    }
}