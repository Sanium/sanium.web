import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SelectedFilters } from '../models/SelectedFilters';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = `http://sanium.olszanowski.it`;

  constructor(private http: HttpClient) {}

  getAdverts(page?: number, filters?: SelectedFilters): Observable<any> {
    let url = `${this.apiUrl}/api/offers`;
    // If filters were selected fetch adverts with filters included
    if(filters) {
      url = url + `?from=${filters.salaryMin}`
      + `&to=${filters.salaryMax}`
      + `${filters.exp? '&exp=' + filters.exp : ''}`
      + `${filters.city? '&city=' + filters.city : ''}`
      + `${filters.technology? '&tech=' + filters.technology : ''}`;

      return this.http.get<any>(url);
    }
    // Else if page selected - fetch page, Else fetch from '/api/offers'
    return this.http.get<any>(`${this.apiUrl}/api/offers${page? '?page=' + page : ''}`);
  }

  getSingleAdvert(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/offers/${id}`);
  }

  slugify(text: string): string {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }
}
