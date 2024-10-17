import { environment } from 'src/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private apiKeyGiphy: string = environment.apiKey;
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  private _tagsHistory: string[] = [];

  constructor(
    private http: HttpClient
  ) { }

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

    this.http.get(`${this.serviceUrl}/search`, {params})
      .subscribe(res => {
        console.log(res)
      })
  }

}

