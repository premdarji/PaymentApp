import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignalRserviceService {


  public data:any;

  constructor(private http:HttpClient) { }


  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    
                            .withUrl('http://localhost:61237/Product',{
                              skipNegotiation: true,
                              transport: signalR.HttpTransportType.WebSockets
                            })
                           
                            .build();
    
    

                 
  this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferAdmindata', (data) => {
      this.data = data;
      console.log(data);
    });
  }



  startHttpRequest()  
  {
    this.http.get('http://localhost:61237/api/Product/SignalR')
      .subscribe(res => {
        console.log(res);
      })
  }


  askServer(){
    this.hubConnection.invoke("AskServer","hello")
    .catch(err=>console.log(err))
  }

  askServerListener(){
    this.hubConnection.on("transferAdmindata",(response)=>{
      console.log(response);
    })
  }

}
