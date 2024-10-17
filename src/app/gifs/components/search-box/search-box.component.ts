import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gif-shearch-box',
  template: `
    <h5>Buscar:</h5>
    <div class="d-flex align-items-center mb-2">
      <input type="text" class="form-control me-2" placeholder="Buscar gifs..."
        style="width: 374px;" (keyup.enter)="searchTag()"
        #txtTagInput
      >
      <button class="btn btn-dark" (click)="clearHistory()">Limpiar</button>
    </div>
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private gifsService: GifsService
  ) { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
    console.log(newTag);
  }

  clearHistory() {
    this.gifsService.clearLocalStorage();
  }
}
