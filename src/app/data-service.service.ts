import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {
  constructor(private http: HttpClient){}
  getJsonData(): Promise<any[]>{
    return this.http.get<any[]>('https://shielded-dusk-49810.herokuapp.com/assets/data.json').toPromise();
  }
}