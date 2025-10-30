import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'search/:query',
    renderMode: RenderMode.Server
  },
  {
    path: 'entry/:title',
    renderMode: RenderMode.Server
  },
  {
    path: 'allentries',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
