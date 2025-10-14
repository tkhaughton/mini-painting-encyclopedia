import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBar } from '../../search-bar/search-bar';

@Component({
  selector: 'app-intro-page',
  imports: [RouterModule, SearchBar],
  templateUrl: './intro-page.html',
  styleUrl: './intro-page.css'
})
export class IntroPage {
  //Component for the "where to start" page
}
