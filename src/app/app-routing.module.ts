import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'articles/:id', component: ArticleComponent },
	{ path: 'add-post', component: AddComponent },
	{ path: 'edit/:id', component: AddComponent } //same form for edit/add
];

@NgModule({
	imports: [ 
		RouterModule.forRoot(routes) 
	], 
	exports: [ 
		RouterModule 
	] 
})


export class AppRoutingModule { }



