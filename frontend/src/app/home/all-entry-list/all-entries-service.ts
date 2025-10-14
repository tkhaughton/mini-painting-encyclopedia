import { Injectable, signal } from '@angular/core';
import { Aka } from '../../entry/aka';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, exhaustMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllEntriesService {
  allEntries = signal<Aka[]>([]) //Signal that holds entry list

  constructor(private readonly http: HttpClient) {}

  getallEntries(): Observable<Aka[]> {
    return this.http.get<Aka[]>(`/entry/allentries`)
    .pipe(
      tap((response) => this.allEntries.set(response))
    )
  }
}
