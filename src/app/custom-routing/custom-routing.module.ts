import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComparePageComponent } from '../compare-page/compare-page.component';
import { CmsPageGuard } from '@spartacus/storefront';

const STATIC_ROUTES: Routes = [
  { path: 'compare-page',
    component: ComparePageComponent,
    canActivate: [CmsPageGuard],
    data: {pageLabel: 'homepage'}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(STATIC_ROUTES)
  ]
})
export class CustomRoutingModule { }
