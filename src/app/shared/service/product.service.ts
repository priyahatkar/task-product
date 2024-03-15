import { Injectable } from '@angular/core';
import { Iproduct } from '../model/product';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productUrl : string = `${environment.baseUrl}/prodData.json`
  private $prodObj : Subject<Iproduct> = new Subject<Iproduct>(); 
  public prodObj$ = this.$prodObj.asObservable()

  private productUpdate$ : Subject<Iproduct> =new Subject<Iproduct>()
  public productUpdated$ = this.productUpdate$.asObservable()
  constructor(private _http : HttpClient) { }

  getAllProduct():Observable<Iproduct[]>{
    return this._http.get<Iproduct[]>(this.productUrl)
    .pipe(
      map((res)=>{
        let prodArray : Iproduct[] = []
          for (const key in res) {
            prodArray.unshift({...res[key], id : key})
          }
          return prodArray
      })
    )
  }

  createNewProduct(data : Iproduct){
    return this._http.post(this.productUrl, data)
  }

  sendProduct(std : Iproduct){
    this.$prodObj.next(std)
  }

  getUpdateProduct(prod : Iproduct):Observable<Iproduct>{
    let singleProUrl = `${environment.baseUrl}/prodData/${prod.id}.json`;
    return this._http.patch<Iproduct>(singleProUrl, prod)
  }

  sendUpdateProduct(data : Iproduct){
  this.productUpdate$.next(data)
}

  onDeleteProduct(id : Iproduct): Observable<null>{
    let deleteUrl = `${environment.baseUrl}/prodData/${id}.json`;
    return this._http.delete<null>(deleteUrl)
  }
}
