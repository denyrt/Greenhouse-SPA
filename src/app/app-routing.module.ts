import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/AuthGuard';
import { AccountComponent } from './account/account.component';
import { ControllersComponent } from './controllers/controllers.component';
import { GreenhousesComponent } from './greenhouses/greenhouses.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { component: SignInComponent, path: 'sign-in' },
  { component: AccountComponent, path: 'account', canActivate: [AuthGuard] },
  { component: GreenhousesComponent, path: 'greenhouses', canActivate: [AuthGuard] },
  { component: ControllersComponent, path: 'controllers', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [
  SignInComponent,
  AccountComponent,
  GreenhousesComponent,
  ControllersComponent
];
