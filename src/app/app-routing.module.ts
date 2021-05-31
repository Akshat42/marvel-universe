import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PopularContainerComponent} from "./hero/popular/popular-container/popular-container.component";
import {PageNotFoundComponent} from "./user/page-not-found/page-not-found.component";
import {WelcomeComponent} from "./user/welcome/welcome.component";
import {DetailContainerComponent} from "./shared/detail/detail-container/detail-container.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: "welcome", component: WelcomeComponent},
  {
    path: "home",
    loadChildren: () => import('./hero/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {path: "popular", component: PopularContainerComponent},
  {path: "detail/:id", component: DetailContainerComponent},
  {path: "", redirectTo: "welcome", pathMatch: "full"},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
