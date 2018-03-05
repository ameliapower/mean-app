import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //for accessing url parameters

import { Article } from '../article';
import { ArticleService } from '../article.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

	article: Article; 

	constructor(
		private articleService: ArticleService,
		private actRoute: ActivatedRoute,
		private myRouter: Router
	) { }

	ngOnInit() {
		console.log(this.actRoute.params)
		this.actRoute.params.subscribe((params) => {
			let id = params[`id`];
			this.articleService.getId(id).subscribe(
				article => this.article = article,
				error => console.log(error, `getting id ${id}`)
			)
		});
	}

	goBack(): void {
		this.myRouter.navigateByUrl('/')
	}

	deletePost(post_id){
		this.articleService.deletePost(post_id).subscribe(
			res => { this.myRouter.navigateByUrl('/') }
		)
	}



}
