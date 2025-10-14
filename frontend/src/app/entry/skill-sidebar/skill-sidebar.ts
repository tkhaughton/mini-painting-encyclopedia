import { Component, inject, DestroyRef, Signal, computed } from '@angular/core';
import { entryService } from '../entry.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CleanTitlePipe } from '../../clean-title-pipe';
import { Relationship } from '../relationship';
/**
 * This component renders the list of related and prerequisite skills
 * on the righthand side of the entry page and links to those pages
 */

@Component({
  selector: 'skill-sidebar',
  imports: [RouterLink, CleanTitlePipe],
  templateUrl: './skill-sidebar.html',
  styleUrl: './skill-sidebar.css'
})
export class SkillSidebar {
  //Component for the sidebar on the entry page that creates a list of prerequisite skills and related skills
  private entryService = inject(entryService);
  route: ActivatedRoute = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  
  relationships = this.entryService.relatedSkills.asReadonly();
  prerequisites: Signal<Relationship[]>= computed(() => this.entryService.relatedSkills().filter((relationship) => relationship.relationship==1))
  relatedSkills: Signal<Relationship[]>= computed(() => this.entryService.relatedSkills().filter((relationship) => relationship.relationship==3))

  //Get the last item in each list for purposes of formatting 
  lastPrereq: Signal<Relationship | null>= computed(() => this.getLastRelationship(this.prerequisites()))
  lastRelated: Signal<Relationship | null>= computed(() => this.getLastRelationship(this.relatedSkills()))
  


  //Function to update entry signal when navigating to another entry page because angular
  // won't rerun the constructor when navigating to the same route. Called when clicking
  // Any of the links in the list
  getNewEntry(entryTitle: string) {
    this.entryService.getEntry(entryTitle)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  getLastRelationship(relationships: Relationship[]) {
    if (relationships) {
      return relationships[relationships.length-1]
    } else {
      return null
    }

  }
}

