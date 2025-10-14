import { Injectable, signal } from '@angular/core';
import { EncyclopediaEntry } from '../encyclopediaentry';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, exhaustMap } from 'rxjs';
import { Relationship } from './relationship';
import { Aka } from './aka';

@Injectable({
  providedIn: 'root'
})
export class entryService {
  entry = signal<EncyclopediaEntry | null>(null) //Signal that holds the basic information about the entry
  relatedSkills = signal <Relationship[]>([]) //Signal that holds information about the entry's relationships to other skills
  akas = signal<Aka[]>([]) //Signal that holds information about the entry's other aliases

  constructor(private readonly http: HttpClient) {}

  //Helper Function to getEntry that sets the values of the signals
  setValues(entryValue: EncyclopediaEntry, skillsValue: Relationship[], akasValue: Aka[]) {
    this.entry.set(entryValue)
    this.relatedSkills.set(skillsValue)
    this.akas.set(akasValue) 
  }

  //Gets the entry information from the backend and assigns it to the signals when it arrives
  getEntry(entry: string): Observable<[EncyclopediaEntry, Relationship[], Aka[]]> {
    return this.http.get<[EncyclopediaEntry, Relationship[], Aka[]]>(`/entry/lookup/${entry}`)
    .pipe(
      tap((response) => this.setValues(response[0], response[1], response[2]))
    )
  }
}
