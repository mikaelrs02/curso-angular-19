import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandinpageComponent } from './landinpage/landinpage.component';

const routes: Routes = [
  {
    path: '',
    component: LandinpageComponent
  },
  {
    path: 'paginas',
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
