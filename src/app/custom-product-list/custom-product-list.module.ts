import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomProductListComponent } from './custom-product-list.component';
import { ConfigModule, UrlModule } from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { MediaModule } from '@spartacus/storefront';



@NgModule({
  declarations: [CustomProductListComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        ProductListComponent: {
            component: CustomProductListComponent
        }
      }
    } as CmsConfig),
    RouterModule,
    MediaModule,
    UrlModule
  ]
})
export class CustomProductListModule { }
