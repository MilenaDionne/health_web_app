import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'registerPatient',
    loadChildren: () => import('./views/register-patient/register-patient.module').then(m => m.RegisterPatientModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'admitPatient',
    loadChildren: () => import('./views/admit-patient/admit-patient.module').then(m => m.AdmitPatientModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'updateFile',
    loadChildren: () => import('./views/update-patient/update-patient.module').then(m => m.UpdatePatientModule),
    ...canActivate(redirectUnauthorizedToLogin),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
