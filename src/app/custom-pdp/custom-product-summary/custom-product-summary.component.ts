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
  response: Subscription;
  currentProduct: any;
  productsModal: any;

  constructor(private customProductService: CustomProductService,
             private _modalService: NgbModal,
             private store: Store<State>) { }

  ngOnInit(): void {
    this.product$.subscribe(
      product => {
        this.productCode = product.code;
        this.currentProduct = product;
      });

    this.store.select('productsModal').subscribe(
      (products: any) => {
          this.productsModal = products;
          for(const key in products){
            console.log(key);
            console.log('entre aqui', this.productCode);
            if(key === this.productCode) {
              console.log(this.productCode);
              this.disabledCheckbox = products[key].showProductModal;
            }
          }
        });
  }


  checkChanged(): void {
    if(Object.keys(this.productsModal).length === 0){
      this.disabledCheckbox = false;
    }
    console.log(this.productsModal);
    console.log(this.disabledCheckbox);
    !this.disabledCheckbox ?
    this.store.dispatch(
      { type: '[Product] Add Product Modal',
          currentProduct: this.productCode,
          nameProduct: this.currentProduct.name,
          image: this.currentProduct.images.PRIMARY.product.url,
          price: this.currentProduct.price.formattedValue,
        }
    ):
    this.store.dispatch(
      { type: '[Product] Remove Product Modal',
          currentProduct: this.productCode
        }
    );
    this.store.select('productsModal').subscribe(
      (products: any) => {
          if(Object.keys(products).length !== 0) {
            this._modalService.open(CompareModalComponent)
          }
        }).unsubscribe();
    // this.disabledCheckbox = !this.disabledCheckbox;
    // console.log(this.disabledCheckbox);
    // if(this.customProductService.productsToCompare(this.product$)){

    // }
  }

}
