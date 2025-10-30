import { Component } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-error-page',
  imports: [ SearchBar ],
  templateUrl: './error-page.html',
  styleUrl: './error-page.css'
})
export class ErrorPage {

}
