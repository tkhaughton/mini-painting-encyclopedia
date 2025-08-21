import { Component } from '@angular/core';
import { EncyclopediaEntry } from '../encyclopediaentry';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-home',
  imports: [MatListModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  filteredEntryList: EncyclopediaEntry[] = [
    {
      name: 'Value',
      type: 'Concept',
      description: 'Brightness'
    },
    {
      name: 'Airbrush',
      type: 'Tool',
      description: 'Paint gun'
    }

  ]
  filterResults() {
  }
}
