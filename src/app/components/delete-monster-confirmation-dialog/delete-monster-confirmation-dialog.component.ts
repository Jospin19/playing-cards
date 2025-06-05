import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-monster-confirmation-dialog',
  imports: [
    MatDialogActions, 
    MatDialogTitle, 
    MatDialogClose, 
    MatDialogContent, 
    MatButtonModule
  ],
  templateUrl: './delete-monster-confirmation-dialog.component.html',
  styleUrl: './delete-monster-confirmation-dialog.component.css'
})
export class DeleteMonsterConfirmationDialogComponent {

}
