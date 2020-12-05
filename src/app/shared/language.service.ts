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

    var CommonFields:any[]=[];
    this.http.get(this.APIURL+"/Common").subscribe(res=>{
     this.temp=res;
      CommonFields.push(...this.temp);
      console.log(res[0]["parameter"])
      console.log(CommonFields) 
      console.log(CommonFields.length)
      var i=0;
  
      console.log(CommonFields[30]["value"])

      if(CommonFields["Parameter"]=="Profile"){
        console.log("yes")
      }
    })


    

   
    if(data=="en"){
      return this.http.get("assets/en.json")
      
    }

    return this.http.get("assets/fr.json");
    
  }
}
