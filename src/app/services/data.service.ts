import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Advertisement } from '../models/Advertisement';
import { AdvertisementPages } from '../models/AdvertisementPages';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  advertList: AdvertisementPages = {};
  filters: {};
  isAscendingOrder: boolean = false;
  csrf: string;
  totalItems: number;
  currenPage: number = 1;

  urlBuilder: string;
  apiUrl = `http://sanium.olszanowski.it`; //`${window.location.origin}` http://sanium.olszanowski.it/api
  //TODO:

  constructor(private http: HttpClient) { }

  setAdverts(data: Advertisement[], page: number) {
    this.advertList[page] = data;
  }
  setFilters(data: {}) {
    this.filters = data;
  }

  getPage(page: number) {
    return this.http.get<Advertisement[]>(`${this.apiUrl}/api/offers?page=${page}`);
  }

  getStaticPage(page: number) {
    return this.advertList[page];
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
    if(this.urlBuilder === `${this.apiUrl}/api/offers?from=0&to=20000`){
      return this.getPage(this.currenPage);
    }
    return this.http.get<Advertisement[]>(`${this.urlBuilder}`);
  }

  postApplication(id: number, formData) {
    let httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': this.csrf
      })
    };
    return this.http.post(`${this.apiUrl}/offers/${id}/contact`, formData, httpOptions);
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
