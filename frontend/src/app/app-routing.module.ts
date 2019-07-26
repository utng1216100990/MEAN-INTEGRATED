// modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { PhotosComponent } from './components/photos/photos.component';
import { HomeComponent } from './components/home/home.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { InternalComponent } from './components/internal/internal.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { EditProfileComponent } from './components/user-profile/edit-profile/edit-profile.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'forgot', component: UserComponent,
    children: [{ path: '', component: ForgotPasswordComponent }]
  },
  {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]
  },
  { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard] },
  { path: 'suppliers', component: SuppliersComponent, canActivate: [AuthGuard] },
  { path: 'internal', component: InternalComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
