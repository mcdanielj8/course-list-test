import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {
  constructor(private http: HttpClient){}
  getJsonData(): Promise<any[]>{
    return this.http.get<any[]>('http://localhost:4200/assets/data.json').toPromise();
  }
}