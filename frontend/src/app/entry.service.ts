import { Injectable, signal } from '@angular/core';
import { EncyclopediaEntry } from './encyclopediaentry';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, exhaustMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class entryService {
  response = signal<EncyclopediaEntry| null>(null)

  constructor(private readonly http: HttpClient) {}

  setResponse(value: EncyclopediaEntry) {
    this.response.set(value) 
  }

  getEntry(entry: String): Observable<EncyclopediaEntry> {
    return this.http.get<EncyclopediaEntry>(`/entry/lookup/${entry}`)
    .pipe(
      tap((response) => this.setResponse(response))
    )
  }
}
