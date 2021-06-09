import { Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CustomProductService } from '../custom-pdp/custom-product.service';

/* NgRx imports */
import { Store } from '@ngrx/store';
import { State } from '../custom-pdp/state/product.reducer';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.scss']
})
export class ComparePageComponent implements OnInit {

  pageTitle = 'Compare Products';

  products: Product[];
  product: Observable<Product>

  constructor(private customProductService: CustomProductService, private store: Store<State>) { }

  ngOnInit():void {
    this.store.select('productsModal').subscribe(
      (products:any) => {
        this.products = products;
        console.log(this.products);
      }
    )
  }
}
