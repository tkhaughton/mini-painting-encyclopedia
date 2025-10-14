import { Component, ChangeDetectionStrategy, inject, DestroyRef, Signal, computed } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { entryService } from './entry.service';
import { SearchBar } from '../search-bar/search-bar';
import { SkillSidebar } from './skill-sidebar/skill-sidebar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EntryNode } from './entry-node';
import { tap} from 'rxjs';
import { TitleCasePipe} from '@angular/common';
import { CleanTitlePipe } from '../clean-title-pipe';
import { Aka } from './aka';

@Component({
  selector: 'app-entry',
  imports: [SearchBar, SkillSidebar, TitleCasePipe, CleanTitlePipe],
  templateUrl: './entry.html',
  styleUrl: './entry.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Entry {
  //Component for rendering the page for a given entry, including the title, type, description, etc
  route: ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router)
  private entryService = inject(entryService);
  destroyRef = inject(DestroyRef)
  entryItem = this.entryService.entry.asReadonly();
  akas = this.entryService.akas.asReadonly();

  //Get last aka in list for purposes of formatting aka list in html
  firstAkas: Signal <Aka[]>= computed(() => this.getFirstAkas(this.akas()))
  lastAka: Signal<Aka | null>= computed(() => this.getLastAka(this.akas()))
  descriptionNodes: Signal<EntryNode[] | null> = computed(() => this.parseNodes(this.entryItem()!.description) )


  constructor() {

    this.route.params.pipe(
      tap((params) => console.log(params['title'])),
      tap((params) => this.getNewEntry(params['title'])),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();
    }



  //Converts the entry description into a list of entryNodes for rendering in the html. For each item, text that will be a hyperlink
  //(indicated by @@s on either side in the raw description) is stored in the link attribute, and everything else is stored in the text attribute
  parseNodes(text: string | null)  {
    if (text) {
      return text.split(/(@@.*?@@)/).map(part => {  
        if (part.startsWith('@@') && part.endsWith('@@')) {  
          //All links in markdown are in the format @@plain_text~~link_name@@. Splits along the ~~ to get the plain text and the link name
          let sections = part.slice(2, -2).split("~~")
            return { link: sections[1], text: sections[0] };  
        } else {  
          return { text: part};  
        }  
      });  
    } else {
      return null
    }
  }

  getNewEntry(entryTitle: string) {

    this.entryService.getEntry(entryTitle)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
    
  }

  getFirstAkas(akas: Aka[]) {
    if (akas) {
      return akas.slice(0, -1)
    } else {
      return []
    }
  }

  getLastAka(akas: Aka[]) {
    if (akas) {
      return akas[akas.length-1]
    } else {
      return null
    }

  }
}
