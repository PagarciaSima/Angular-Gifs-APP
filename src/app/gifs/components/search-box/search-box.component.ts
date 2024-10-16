import { Component } from '@angular/core';

@Component({
  selector: 'gif-shearch-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="Buscar gifs...">
  `
})

export class SearchBoxComponent {
  constructor() { }
}
