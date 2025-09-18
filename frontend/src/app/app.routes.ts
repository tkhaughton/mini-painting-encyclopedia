import { Routes } from '@angular/router';
import {Home} from './home/home';
import { SearchResults } from './search-results/search-results';
import { Entry } from './entry/entry';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home page',
    },
    {
        path: 'search/:query',
        component: SearchResults,
        title: "Search Results"
    },
    {
        path: 'entry/:title',
        component: Entry,
        title: "Entry"
    }   
];
