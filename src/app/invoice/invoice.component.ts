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

  panelOpenState = false;
  ngOnInit(): void {

    }



 

}
