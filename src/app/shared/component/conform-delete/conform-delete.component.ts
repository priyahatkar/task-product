import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conform-delete',
  templateUrl: './conform-delete.component.html',
  styleUrls: ['./conform-delete.component.scss']
})
export class ConformDeleteComponent implements OnInit {

  constructor(private _dialogRef : MatDialogRef<ConformDeleteComponent>) { }

  ngOnInit(): void {
  }

  onConformDelete(){
    this._dialogRef.close(true)
  }
  onCancel(){
    this._dialogRef.close(false)
  }
}
