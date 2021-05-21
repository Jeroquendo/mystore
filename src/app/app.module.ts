import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { ComparePageComponent } from './compare-page/compare-page.component';
import { CustomRoutingModule } from './custom-routing/custom-routing.module';
import { CommonModule } from '@angular/common';
import { CustomPdpModule } from './custom-pdp/custom-pdp.module';
import { CustomProductListModule } from './custom-product-list/custom-product-list.module';
import { CompareModalComponent } from './custom-pdp/compare-modal/compare-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ComparePageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: 'https://spartacus-demo.eastus.cloudapp.azure.com:8443',
          // baseUrl: 'https://electronics.local:9002',
          prefix: '/occ/v2/'

        }
      },
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['electronics-spa']
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
      features: {
        level: '3.1'
      }
    }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'My Store App Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
    CustomProductListModule,
    CustomPdpModule,
    BrowserTransferStateModule,
    CustomRoutingModule,
    CommonModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
