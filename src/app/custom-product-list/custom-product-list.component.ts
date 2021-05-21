import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnChanges, Optional } from '@angular/core';
import { ProductListItemContext, ProductListOutlets } from '@spartacus/storefront';
import { ProductListItemContextSource } from '@spartacus/storefront';



@Component({
  selector: 'app-custom-product-list',
  templateUrl: './custom-product-list.component.html',
  styleUrls: ['./custom-product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ]
})
export class CustomProductListComponent implements OnChanges {

  readonly ProductListOutlets = ProductListOutlets;
  @Input() product: any;

  constructor(productListItemContextSource: ProductListItemContextSource);

  constructor();
  constructor(
    @Optional()
    protected productListItemContextSource?: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.product) {
      this.productListItemContextSource?.product$.next(this.product);
    }
  }

}
