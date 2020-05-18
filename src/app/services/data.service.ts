import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Advertisement } from '../models/advertisement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  advertList: Advertisement[];
  filters: {};
  isAscendingOrder: boolean = false;
  isDarkTheme: boolean = false;

  urlBuilder: string;
  apiUrl = `${window.location.origin}`; //http://${window.location.hostname}/api/offers` http://sanium.olszanowski.it/api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  setAdverts(data: Advertisement[]) {
    this.advertList = data;
  }
  setFilters(data: {}) {
    this.filters = data;
  }
  updateAdverts(data: Advertisement[]) {
    data.forEach((element) => this.advertList.push(element));
  }

  getNextPage(url: string) {
    return this.http.get<Advertisement[]>(url);
  }

  getStaticAdverts() {
    return this.advertList;
  }

  getFilters() {
    return this.filters;
  }

  getAdvertsFromServer(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${this.apiUrl}/api/offers`);
  }

  getSingleAdvert(id: number): Observable<Advertisement> {
    return this.http.get<Advertisement>(`${this.apiUrl}/api/offers/${id}`);
  }

  getFilteredAdverts(filters: {}): Observable<Advertisement[]> {
    this.urlBuilder = `${this.apiUrl}/api/offers`;
    this.urlBuilder += `?from=${filters['salaryMin']}&to=${filters['salaryMax']}`;
    if (filters['technology']) this.urlBuilder += `&tech=${filters['technology']}`;
    if (filters['exp']) this.urlBuilder += `&exp=${filters['exp']}`;
    if (filters['city']) this.urlBuilder += `&city=` + this.slugify(filters['city']);
    return this.http.get<Advertisement[]>(`${this.urlBuilder}`);
  }

  postApplication(id: number, formData) {
    return this.http.post(`${this.apiUrl}/offers/${id}/contact`, formData, this.httpOptions);
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
