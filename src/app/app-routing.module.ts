import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PopularContainerComponent} from "./hero/popular/popular-container/popular-container.component";
import {PageNotFoundComponent} from "./user/page-not-found/page-not-found.component";
import {WelcomeComponent} from "./user/welcome/welcome.component";
import {AuthGuard} from "./guard/auth.guard";
import {DetailContainerComponent} from "./hero/detail/detail-container/detail-container.component";
import {LoginComponent} from "./user/login/login.component";

const routes: Routes = [
  {path: "welcome", component: WelcomeComponent},
  {path: "login", component: LoginComponent, outlet: "loginPage"},
  {
    path: "home",
    loadChildren: () => import('./hero/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {path: "popular", component: PopularContainerComponent, canActivate: [AuthGuard]},
  {path: "detail/:id", component: DetailContainerComponent, canActivate: [AuthGuard]},
  {path: "", redirectTo: "welcome", pathMatch: "full"},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
