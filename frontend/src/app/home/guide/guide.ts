import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBar } from '../../search-bar/search-bar';

@Component({
  selector: 'app-guide',
  imports: [RouterModule, SearchBar],
  templateUrl: './guide.html',
  styleUrl: './guide.css'
})
export class Guide {
  //Component for the How To Use This Encyclopedia page
}
