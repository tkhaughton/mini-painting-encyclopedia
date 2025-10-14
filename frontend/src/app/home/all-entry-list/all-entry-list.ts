import { Component, computed, inject, signal, DestroyRef  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBar } from '../../search-bar/search-bar';
import { AllEntriesService } from './all-entries-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Aka } from '../../entry/aka';
import { tap } from 'rxjs';
import { Signal } from '@angular/core';
import { AlphabetizedAka } from './alphabetized-aka';
import { TitleCasePipe } from '@angular/common';
import { CleanTitlePipe } from '../../clean-title-pipe';

@Component({
  selector: 'app-all-entry-list',
  imports: [RouterModule, SearchBar, TitleCasePipe, CleanTitlePipe],
  templateUrl: './all-entry-list.html',
  styleUrl: './all-entry-list.css'
})
export class AllEntryList {
  //Component that lists all entries in alphabetic order sorted by letter
  private allEntriesService = inject(AllEntriesService);
  destroyRef = inject(DestroyRef)
  alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  allEntries = this.allEntriesService.allEntries.asReadonly()
  allEntriesAlphabetized = computed(() => this.sortByLetter(this.allEntries()))

  constructor() {
    this.allEntriesService.getallEntries()
      .pipe(
        tap((response) => this.sortByLetter(response)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  sortByLetter(allEntriesList: Aka[]): AlphabetizedAka[] {
    //Generate list of objects with two properties: letter, and all the entries that start with that letter
    return this.alphabet.map((letter) => ({
      letter: letter,
      akas: allEntriesList.filter((entry) => entry.aka.startsWith(letter))
    }))
  }

}
