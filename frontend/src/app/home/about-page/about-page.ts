import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBar } from '../../search-bar/search-bar';

@Component({
  selector: 'app-about-page',
  imports: [RouterModule, SearchBar],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css'
})
export class AboutPage {
  //Component for the about page
}
