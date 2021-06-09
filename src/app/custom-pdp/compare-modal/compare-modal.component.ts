import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CustomProductService } from '../custom-product.service';

import { Store } from '@ngrx/store';
import { State } from '../state/product.reducer';

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html'
})
export class CompareModalComponent implements OnInit{

  products: Product[];
  product$: Observable<Product>;
  constructor( public modal: NgbActiveModal, private customProductService: CustomProductService, private store: Store<State>) {}

  ngOnInit():void {
    this.store.select('productsModal').subscribe(
      (products:any) => {
        this.products = products;
        console.log(this.products);
      }
    )
  }

  // onClick(): void {
  //   let compareButton = document.getElementById('#compare-button');
  //   compareButton.setAttribute('style', 'visibility: hidden');
  // }


}
