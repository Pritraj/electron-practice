import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpcComponent } from './components/ipc/ipc.component';

const routes: Routes = [
  { path: 'first-component', component: IpcComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
