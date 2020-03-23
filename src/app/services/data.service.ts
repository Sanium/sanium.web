import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Advertisement } from '../models/advertisement';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  advertList: Advertisement[];
  filters: {};
  urlBuilder: string;
  urlFinal: string;
  host = window.location.hostname;
  apiUrl = this.host + `/api/offers`;

  constructor(private http: HttpClient) { }

  setAdverts(data: Advertisement[]){
    this.advertList = data;
  }
  setFilters(data: {}){
    this.filters = data;
  }
  updateAdverts(data: Advertisement[]){
    data.forEach( (element) => this.advertList.push(element));
  }

  getNextPage(url: string){
    return this.http.get<Advertisement[]>(url);
  }

  getStaticAdverts(){
    return this.advertList;
    console.log(this.host);
  }

  getFilters(){
    return this.filters;
  }

  getAdverts(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(this.apiUrl);
  }

  getSingleAdvert(id: number): Observable<Advertisement> {
    return this.http.get<Advertisement>(`${this.apiUrl}/${id}`);
  }

  getFilteredAdverts(data: {}): Observable<Advertisement[]> {
    this.urlBuilder = this.apiUrl;
    this.urlBuilder += `?from=${data['salaryMin']}&to=${data['salaryMax']}`;
    if (data['selectedTechOption']) this.urlBuilder += `&tech=${data['selectedTechOption']}`;
    if (data['selectedExpOption']) this.urlBuilder += `&exp=${data['selectedExpOption']}`;
    if (data['city']) this.urlBuilder += `&city=` + this.slugify(data['city']);
    console.log(this.urlBuilder);
    return this.http.get<Advertisement[]>(`${this.urlBuilder}`);
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
