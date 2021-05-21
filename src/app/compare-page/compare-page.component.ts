import { Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CustomProductService } from '../custom-pdp/custom-product.service';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.scss']
})
export class ComparePageComponent implements OnInit {

  pageTitle = 'Compare Products';

  products: Product[];
  product: Observable<Product>

  constructor(private customProductService: CustomProductService) { }

  ngOnInit():void {
    this.products = this.customProductService.productsToCompare(this.product);
  }

}
