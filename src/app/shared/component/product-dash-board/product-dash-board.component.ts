import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { SanckBarService } from '../../service/sanck-bar.service';

@Component({
  selector: 'app-product-dash-board',
  templateUrl: './product-dash-board.component.html',
  styleUrls: ['./product-dash-board.component.scss']
})
export class ProductDashBoardComponent implements OnInit {
  public productArray : Iproduct[] = []
  constructor(private _proService : ProductService,
              private _snackBar : SanckBarService,
                private _matDialogRef : MatDialog) { }

  ngOnInit(): void {
    this._proService.getAllProduct()
      .subscribe(res=>{
        this.productArray = res
      })

      this._proService.prodObj$
        .subscribe(res =>{
          this.productArray.unshift(res)
          this._snackBar.openSnackBar(`This product is successfully added ${res.name}`, 'Close')

        })

    this._proService.productUpdated$
      .subscribe(res =>{
        this.productArray.forEach(pro =>{
          if(pro.id === res.id){
            pro.name = res.name,
            pro.detail = res.detail
          }
        })
      })
  }

  productEdit(prod : Iproduct){
    const dialogConf = new MatDialogConfig()
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.data = prod;
    const dialogRef = this._matDialogRef.open(ProductFormComponent, dialogConf)
  }
  onProductAdd(){
    const dialogConf = new MatDialogConfig()
    dialogConf.disableClose = true;
    const dialogRef = this._matDialogRef.open(ProductFormComponent, dialogConf)
  }

  onDeleteProd(id : any){
    let getIndex = this.productArray.findIndex(prod => prod.id === id)
    this.productArray.splice(getIndex, 1)
  }
}
