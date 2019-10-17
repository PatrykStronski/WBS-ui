import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BandsComponent } from './bands/bands.component';
import { NewBandComponent } from './new-band/new-band.component';

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'bands', component: BandsComponent},
	{path: 'addBand', component: NewBandComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
