import { Component, inject, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'camersportangular';

  primengConfig:PrimeNGConfig=inject(PrimeNGConfig)
  ngOnInit(): void {
    this.primengConfig.setTranslation({
      accept: 'Oui',
      reject: 'Non',
      // Add all translations you need
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
      monthNames: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
      monthNamesShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun","Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
      today: 'Aujourd\'hui',
      clear: 'Effacer',
      // ... other translations
    });
  }
}
