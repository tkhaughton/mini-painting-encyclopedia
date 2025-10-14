import { ChangeDetectionStrategy, Component, inject, DestroyRef} from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { searchService } from '../search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { EncyclopediaEntry } from '../encyclopediaentry';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'search-bar',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {
  //Component for the search bar at the top of most pages
  private router = inject(Router)
  private searchService = inject(searchService)
  destroyRef = inject(DestroyRef)
  testValue: EncyclopediaEntry[] | null = null;

  searchForm = new FormGroup({
    query: new FormControl('')
  })

  formSearch() {
    this.router.navigate(['/search', this.searchForm.value.query ?? ''])
}
}