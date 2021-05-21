import { Injectable, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomProductService implements OnDestroy{

  products: Product[] = [];
  productsFiltered: Product[] = [];
  productSummary: Product;
  subs: Subscription | undefined;
  selectedProduct$: Observable<Product>;
  constructor(private currentProductService: CurrentProductService) {
    this.selectedProduct$ = this.currentProductService.getProduct();
    console.log(this.selectedProduct$);
  }

  productsToCompare(originalProduct: Observable<Product>): Product[] {
    // console.log(this.selectedProduct$);
    originalProduct = this.selectedProduct$;
    this.subs = originalProduct.subscribe(
        product => {
          // console.log(product)
          this.productSummary = {
            name: product.name,
            price: product.price,
            code: product.code,
            averageRating: product.averageRating,
            stock: product.stock,
            summary: product.summary,
            images: product.images
          };
          console.log(this.productSummary);
          this.products = this.products.some(product =>  product.code === this.productSummary.code) ?
          [...this.products] : [...this.products, this.productSummary];
          console.log(this.products);
        }
      )
    // return this.productsFiltered;
    return this.products;
  }

  productToCompare(product: Product):Product[] {
    if(!this.products.includes(product)) {
      this.products.push(product);
      return this.products;
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
