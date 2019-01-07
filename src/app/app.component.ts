import { Component } from '@angular/core';
import { DataService } from './data-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService],
})
export class AppComponent {
  public data: any[];

  constructor(
    public dataService: DataService,
    ) {}

  ngOnInit() {
    this.data = [];
    this.dataService.getJsonData()
      .then( result => {
        this.data = result.reduce((acum, card) => {
          // Gets current date
          const date = card.time.split(' ')[0];

          // Creates new array (if does not exist)
          if(!acum[date]) {
            acum[date] = [];
          }

          // Change the time format
          card.date = moment(card.time).format('ddd, MMMM Do YYYY');
          card.time = moment(card.time).format('hh:mm a');

          // Adds card and returns acumulator
          acum[date].push(card);
          return acum;
        }, {});

        // Convert the object of arrays to array of arrays (so ngFor doesn't complain)
        this.data = Object.entries(this.data)
          .sort(([aDate], [bDate]) => aDate > bDate ? 1 : -1)
          .reduce((acum, [date, group]) => {
            // Sorts by time
            group.sort((aCard, bCard) => aCard.time > bCard.time ? 1 : -1);
            // Adds group and continue
            acum.push(group);
            return acum;
          }, []);
      })
      .catch( error => {
        console.log('Error Getting Data: ', error);
      });
  }
}