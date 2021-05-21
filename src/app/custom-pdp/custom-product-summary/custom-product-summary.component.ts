import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Product } from '@spartacus/core';
import { CurrentProductService, ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { CompareModalComponent } from '../compare-modal/compare-modal.component';
import { CustomProductService } from '../custom-product.service';
import { State } from '../state/product.reducer';


@Component({
  selector: 'app-custom-product-summary',
  templateUrl: './custom-product-summary.component.html',
  styleUrls: ['./custom-product-summary.component.scss']
})
export class CustomProductSummaryComponent implements OnInit {
  iconTypes = ICON_TYPE;

  disabledCheckbox = false;
  displayModal: boolean;
  checkbox = false;
  product$ = this.customProductService.selectedProduct$;
  productSummary: Product;
  products: Product[];
  sub: Subscription | undefined;
  productCode: string;

  constructor(private customProductService: CustomProductService,
             private _modalService: NgbModal,
             private store: Store<State>) { }

  ngOnInit(): void {
    this.product$.subscribe(
      product => this.productCode = product.code);

    this.store.select('productsModal').subscribe(
      (products: any) => {
          for(const key in products){
            console.log(key);
            console.log('entre aqui', this.productCode);
            if(key === this.productCode) {
              console.log(this.productCode);
              this.disabledCheckbox = products[key].showProductModal;
            }
          }
        })
        // if (products) {
        //   this.displayModal = products.showProductModal;
        // }

  }


  // openModal(){
  //   this.toggleModal = true;
  // }

  // open(name: string): void {
  //   console.log(JSON.parse(localStorage.getItem('product')));
  //   const existingProduct = JSON.parse(localStorage.getItem('product'));
  //   if(existingProduct){
  //     console.log('entre');
  //     localStorage.setItem('product', JSON.stringify([this.productSummary, ...existingProduct]));
  //   } else {
  //     localStorage.setItem('product', JSON.stringify([this.productSummary]));
  //   }
  //   this._modalService.open(CompareModalComponent);
  // }

  // onClickModal(): void {
  //   if(!this.disabledCheckbox){
  //     this.disabledCheckbox = !this.disabledCheckbox;
  //   }
  // }

  checkChanged(): void {
    !this.disabledCheckbox ?
    this.store.dispatch(
      { type: '[Product] Add Product Modal',
          currentProduct: this.productCode
        }
    ):
    this.store.dispatch(
      { type: '[Product] Remove Product Modal',
          currentProduct: this.productCode,
        }
    )
    this.store.select('productsModal').subscribe(
      (products: any) => {
          if(Object.keys(products).length !== 0) {
            this._modalService.open(CompareModalComponent)
          }
        });
    // if(this.customProductService.productsToCompare(this.product$)){

    // }
  }

  open():void {
    // console.log(this.customProductService.productsToCompare());
    // this.products = this.customProductService.productsToCompare()
    //   .filter((value,index) => {
    //     return this.customProductService.productsToCompare().indexOf(value) === index;
    //   });

    if(!this.disabledCheckbox){
      this.disabledCheckbox = !this.disabledCheckbox;
    }
  }
}
