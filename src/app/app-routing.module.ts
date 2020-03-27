import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ViewDataComponent } from './view-data/view-data.component';
import { AboutComponent } from './about/about.component';
import { SourcesComponent } from './sources/sources.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'view/:country', component: ViewDataComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sources', component: SourcesComponent },
  { path: 'timeline/:country', component: TimelineComponent },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
