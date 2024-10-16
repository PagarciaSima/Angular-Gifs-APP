import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/search-box/card-list/card-list.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
