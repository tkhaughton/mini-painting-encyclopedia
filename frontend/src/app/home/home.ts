import { Component, inject, DestroyRef} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  //Component for the main search page
  private router = inject(Router)
  destroyRef = inject(DestroyRef)

  searchForm = new FormGroup({
    query: new FormControl('')
  })
  constructor() {
  }

    formSearch() {
    this.router.navigate(['/search', this.searchForm.value.query ?? ''])
}
}
