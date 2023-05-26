import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTesterComponent } from './data-tester/data-tester.component';

const routes: Routes = [
  { path: 'data-tester', component: DataTesterComponent },
  { path: '', redirectTo: '/data-tester', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
