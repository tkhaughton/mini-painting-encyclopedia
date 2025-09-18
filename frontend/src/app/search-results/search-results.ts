import { ChangeDetectionStrategy, Component, inject, DestroyRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncyclopediaEntry } from '../encyclopediaentry';
import { searchService } from '../search.service';
import { SearchBar } from '../search-bar/search-bar';
import { MatListModule } from '@angular/material/list';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-search-results',
  imports: [SearchBar, MatListModule, RouterModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResults {
  route: ActivatedRoute = inject(ActivatedRoute);
  private searchService = inject(searchService);
  destroyRef = inject(DestroyRef)
  results = this.searchService.response.asReadonly();

  constructor() {
    this.searchService.getSearch(this.route.snapshot.params['query'])
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
