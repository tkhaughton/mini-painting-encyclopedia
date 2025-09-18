import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { Router} from '@angular/router';
import { searchService } from '../search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EncyclopediaEntry } from '../encyclopediaentry';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {
  private router = inject(Router)
  private searchService = inject(searchService)
  destroyRef = inject(DestroyRef)
  testValue: EncyclopediaEntry[] | null = null;

  searchForm = new FormGroup({
    query: new FormControl('')
  })

  formSearch() {
    console.log(this.searchForm.value.query ?? '')
    this.searchService.getSearch(this.searchForm.value.query ?? '')
      .pipe(
        tap((response) => (this.testValue = response)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
    console.log("hello")
    this.router.navigate(['/search', this.searchForm.value.query ?? ''])
}
}