import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Iproduct } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConformDeleteComponent } from '../conform-delete/conform-delete.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() productData !: Iproduct[];
  @Output() emitProduct : EventEmitter<Iproduct> = new EventEmitter<Iproduct>();
  @Output() emitProductDelete : EventEmitter<Iproduct> = new EventEmitter<Iproduct>();
  constructor(private _proService : ProductService,
              private _matDialog : MatDialog) { }

  ngOnInit(): void {
  }
  
  onEditProduct(prod : Iproduct){
    this.emitProduct.emit(prod);
  }

  onDeleteProduct(id : any){
    const dialogConf = this._matDialog.open(ConformDeleteComponent)
    dialogConf.afterClosed()
      .subscribe(getConformation =>{
        if(getConformation){
          this._proService.onDeleteProduct(id)
            .subscribe(res =>{
              this.emitProductDelete.emit(id)
            })
        }
      })
  }
}
