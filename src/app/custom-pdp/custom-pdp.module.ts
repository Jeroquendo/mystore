import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomProductIntroComponent } from './custom-product-intro/custom-product-intro.component';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CustomProductSummaryComponent } from './custom-product-summary/custom-product-summary.component';
import { IconModule, StarRatingModule } from '@spartacus/storefront';
import { CompareModalComponent } from './compare-modal/compare-modal.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product.reducer';



@NgModule({
  declarations: [CustomProductIntroComponent, CustomProductSummaryComponent, CompareModalComponent],
  imports: [
    CommonModule,
    StarRatingModule,
    IconModule,
    ConfigModule.withConfig({
      cmsComponents: {
        ProductIntroComponent: {
          component: CustomProductIntroComponent
        },
        ProductSummaryComponent: {
          component: CustomProductSummaryComponent
        }
      }
    } as CmsConfig),
    RouterModule,
    StoreModule.forFeature('productsModal', productReducer)
  ]
})
export class CustomPdpModule { }
