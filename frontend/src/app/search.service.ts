import { Injectable, signal} from '@angular/core';
import { EncyclopediaEntry } from './encyclopediaentry';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, exhaustMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class searchService {
  response = signal<EncyclopediaEntry[]>([])

  constructor(private readonly http: HttpClient) {}

  getSearch(query: String): Observable<EncyclopediaEntry[]> {
    return this.http.get<EncyclopediaEntry[]>(`/entry/search/${query}`)
    .pipe(
      tap((response) => this.setResponse(response))
    )
  }
  setResponse(value: EncyclopediaEntry[]) {
    this.response.set(value) 
  } 
  
  getEntry(title: String): Observable<EncyclopediaEntry[]> {
    return this.http.get<EncyclopediaEntry[]>(`/entry/lookup/${title}`);
  }
}
