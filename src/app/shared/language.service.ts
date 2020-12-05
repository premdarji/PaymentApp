import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly APIURL="http://localhost:61237/api";

  
  temp:any;
  constructor(private http:HttpClient) { }

  GetData(data:any){

   
    if(data=="en"){
      //return this.http.get("assets/en.json")
      return this.http.get(this.APIURL+"/Common/"+1);
    }
    else{
      return this.http.get(this.APIURL+"/Common/"+2);
    }

    //return this.http.get("assets/fr.json");
    
  }
}
