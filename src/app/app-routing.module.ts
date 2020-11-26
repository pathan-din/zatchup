import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';



const routes: Routes = [
  {
    path: 'user', pathMatch: 'full',
    loadChildren: () => import('./modules/user/userweb.module').then(m => m.UserwebModule)
  },
  {
    path: 'ei',
    loadChildren: () => import('./modules/ei/ei.module').then(m=> m.EIModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  // { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
