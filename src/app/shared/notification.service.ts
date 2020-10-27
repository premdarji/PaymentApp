import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar:MatSnackBar) { }
  
  config:MatSnackBarConfig={
    duration:3000,
    horizontalPosition:"right",
    verticalPosition:"top",

  }
  updateconfig:MatSnackBarConfig={
    duration:3000,
    horizontalPosition:"right",
    verticalPosition:"bottom",
  }

  success(msg){
    this.config['panelClass']=['success'];
    this.snackbar.open(msg,'',this.config);
  }

  update(msg){
    this.updateconfig['panelClass']=['success'];
    this.snackbar.open(msg,'',this.updateconfig);
  }

  Delete(msg){
    this.updateconfig['panelClass']=['delete'];
    this.snackbar.open(msg,'',this.updateconfig);
  }

}
