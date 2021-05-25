import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeContainerComponent} from "./hero/home/home-container/home-container.component";
import {PopularContainerComponent} from "./hero/popular/popular-container/popular-container.component";
import {PageNotFoundComponent} from "./user/page-not-found/page-not-found.component";
import {WelcomeComponent} from "./user/welcome/welcome.component";

const routes: Routes = [
  {path:"", redirectTo:"welcome",component:WelcomeComponent},
  {path:"welcome",component:WelcomeComponent},
  {path:"home",component:HomeContainerComponent},
  {path:"popular",component:PopularContainerComponent},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
