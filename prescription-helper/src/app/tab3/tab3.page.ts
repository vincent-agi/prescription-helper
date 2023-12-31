import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonAccordion, IonItem, IonLabel, IonAccordionGroup } from '@ionic/angular/standalone';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonAccordion, IonItem, IonLabel, IonAccordionGroup],
})
export class Tab3Page {
  constructor() {}
}
