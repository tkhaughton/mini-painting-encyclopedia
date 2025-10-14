import { Routes } from '@angular/router';
import {Home} from './home/home';
import { SearchResults } from './search-results/search-results';
import { Entry } from './entry/entry';
import { AboutPage } from './home/about-page/about-page'
import { Guide } from './home/guide/guide';
import { IntroPage } from './home/intro-page/intro-page';
import { AllEntryList } from './home/all-entry-list/all-entry-list';

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
    },
    {
        path: 'about',
        component: AboutPage,
        title: 'About The Encyclopedia'
    },
    {
        path: 'guide',
        component: Guide,
        title: 'First-time Painter Guide'
    },
    {
        path: 'intro',
        component: IntroPage,
        title: 'How To Use This Encyclopedia'
    },
    {
        path: 'allentries',
        component: AllEntryList,
        title: "All Entries - The Miniature Painting Encyclopedia"
    }
];
