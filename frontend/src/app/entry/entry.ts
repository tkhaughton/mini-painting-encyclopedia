import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { entryService } from '../entry.service';
import { SearchBar } from '../search-bar/search-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-entry',
  imports: [SearchBar],
  templateUrl: './entry.html',
  styleUrl: './entry.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Entry {
  route: ActivatedRoute = inject(ActivatedRoute);
  private entryService = inject(entryService);
  destroyRef = inject(DestroyRef)
  entryItem = this.entryService.response.asReadonly();

  constructor() {
  this.entryService.getEntry(this.route.snapshot.params['title'])
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();
}
}
