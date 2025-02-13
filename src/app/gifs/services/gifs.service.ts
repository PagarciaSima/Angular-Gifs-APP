import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private apiKeyGiphy: string = environment.apiKey;
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  private _tagsHistory: string[] = [];
  public gifsList: Gif[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.loadFromLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  /**
 * Organiza el historial de tags, asegurando que los tags sean únicos
 * y que se mantenga un máximo de 10 entradas.
 *
 * @private
 * @param {string} tag - El tag a añadir al historial.
 *
 * @description
 * - Convierte el tag a minúsculas para mantener consistencia.
 * - Si el tag ya existe en el historial, se elimina su versión anterior.
 * - Añade el tag al principio del historial.
 * - Limita el historial a 10 elementos usando `splice`.
 */
  private organizeHistory (tag: string) {
    tag = tag.toLowerCase();
    // Eliminar tags repetidos quedándose con el más reciente
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((savedTag) => savedTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }

  public clearLocalStorage() {
    localStorage.clear();
    this._tagsHistory = [];
    this.gifsList = [];
  }

/**
 * Añade un nuevo tag al historial si no está vacío.
 * Si el tag es válido, lo organiza en el historial
 * manteniendo solo los más recientes.
 *
 * @param {string} tag - El tag a buscar y agregar al historial.
 *
 * @returns {void} - No retorna ningún valor.
 */
  searchTag(tag: string): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKeyGiphy)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(res => {
        this.gifsList = res.data;
      });
  }

}

