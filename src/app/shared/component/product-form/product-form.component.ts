import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Iproduct } from '../../model/product';
import { SanckBarService } from '../../service/sanck-bar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public productForm !: FormGroup;
  public updateMode : boolean = false;
  public proId !: Iproduct
  constructor( @Inject(MAT_DIALOG_DATA)getProdId : Iproduct,
                private _proService : ProductService,
                private _snackBar : SanckBarService,
                private _dailogRef : MatDialogRef<ProductFormComponent>) {
                  this.CreateProductForm();
                    this.proId = getProdId;
                    if(getProdId){
                      this.productForm.patchValue(getProdId)
                      this.updateMode = true;
                      this._proService.getUpdateProduct(getProdId)
                    }
                }

  ngOnInit(): void {
    
  }

  CreateProductForm(){
    this.productForm = new FormGroup({
      name : new FormControl(null,[Validators.required]),
      detail : new FormControl(null,[Validators.required])
    })
  }

  onProductAdd(){
    if(this.productForm.valid){
      let proData = this.productForm.value;
      console.log(proData);
      this._proService.createNewProduct(proData)
        .subscribe(res =>{
          this._proService.sendProduct(proData)
          this._dailogRef.close()
        })
        this.productForm.reset()
    }
    
  }
  onCancelProd(){
    this._dailogRef.close()
  }

  onUpdateProduct(){
    let updateId : Iproduct = {...this.productForm.value, id : this.proId.id}
    console.log(updateId);

    this._proService.getUpdateProduct(updateId)
      .subscribe(res =>{
        this._proService.sendUpdateProduct(res)
        this._dailogRef.close()
        this._snackBar.openSnackBar(`The product has been updated ${res.name}` , 'Close')
      })
    
  }
}
