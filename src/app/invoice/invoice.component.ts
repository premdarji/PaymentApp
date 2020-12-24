import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(public invoice:OrderService) { }

  invoiceDetails:any;
  id:any;
  orderId:any;
  ngOnInit(): void {
this.invoice.GetInvoiceDetails().subscribe(res=>{
  this.invoiceDetails=res;
  console.log(this.invoiceDetails)
  this.id=this.invoiceDetails[0]['invoiceId'];
  this.orderId=this.invoiceDetails[0]['orderId'];
})

  }


  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    console.log(data)
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 300;   
      var pageHeight = 300;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      console.log(contentDataURL)
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  } 

}
