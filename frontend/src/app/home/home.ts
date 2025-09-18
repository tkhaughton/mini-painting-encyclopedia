import { Component} from '@angular/core';
import { EncyclopediaEntry } from '../encyclopediaentry';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-home',
  imports: [SearchBar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor() {
  }
}
