import { ChangeDetectionStrategy, Component, inject, DestroyRef, computed} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { searchService } from '../search.service';
import { SearchBar } from '../search-bar/search-bar';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { CleanDescriptionPipe } from './clean-description-pipe';
import { CleanTitlePipe } from '../clean-title-pipe';

//Component that displays a list of search results on the search page
@Component({
  selector: 'app-search-results',
  imports: [SearchBar, RouterModule, TitleCasePipe, CleanDescriptionPipe, CleanTitlePipe],
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
    this.route.params.pipe(
      tap((params) => console.log(params['query'])),
      tap((params) => this.getSearch(params['query'])),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();

    // this.searchService.getSearch(this.route.snapshot.params['query'])
    //   .pipe(
    //     takeUntilDestroyed(this.destroyRef)
    //   )
    //   .subscribe();
  }

  getSearch(query: string) {
    this.searchService.getSearch(query)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();
  }
}
