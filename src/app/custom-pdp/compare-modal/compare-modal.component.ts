import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CustomProductService } from '../custom-product.service';

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html'
})
export class CompareModalComponent implements OnInit {

  products: Product[];
  product$: Observable<Product>;
  constructor( public modal: NgbActiveModal, private customProductService: CustomProductService) {}

  ngOnInit():void {
    this.products = this.customProductService.productsToCompare(this.product$);
  }

  // onClick(): void {
  //   let compareButton = document.getElementById('#compare-button');
  //   compareButton.setAttribute('style', 'visibility: hidden');
  // }
}
