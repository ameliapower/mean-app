import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
	articles: Article[];
	article: Article;
	postForm: FormGroup;

	constructor(
		private articleService: ArticleService,
		private actRoute: ActivatedRoute,
		private myRouter: Router,
		private fb: FormBuilder
	) { }

	ngOnInit() {
		//get posts
		this.articleService.getAll().subscribe(res => this.articles = res)

		//if id, then edit
		this.actRoute.params.subscribe((params) => {
			if(params[`id`]){
				this.articleService.getId(params[`id`])
				.subscribe( res => {
					this.article = res;
					console.log(this.article);
					console.log(params[`id`]);
					this.postForm = this.fb.group({
						title: [this.article['title'], Validators.compose(
							[Validators.required, Validators.min(10), Validators.max(60)]
						)], //current title, followed by validation 
						content: [this.article['content'], Validators.compose(
							[Validators.required, Validators.min(10)]
						)] 
					});

				})
			}else{ // else add
				//structure form with formBuilder
				this.postForm = this.fb.group({
					title: [null, Validators.compose(
						[Validators.required, Validators.min(10), Validators.max(60)]
					)], //default null value, followed by validation 
					content: [null, Validators.compose(
						[Validators.required, Validators.min(10)]
					)] 
				});
			}

		});

	} //ngOnInit


	addPost(articleId, article : Article) {
		//edit existing post
		if(articleId !== undefined){ 
			this.articleService.editPost(article, articleId._id)
			  .subscribe(editPost => {
				this.myRouter.navigateByUrl('/');
			  })
		}else{ //create new one
			this.articleService.addPost(article).subscribe(
				newPost => {
					this.articles.push(newPost);
					this.myRouter.navigateByUrl('/');
				}
			)
		}
	} //addPost


	goBack(): void {
		this.myRouter.navigateByUrl('/')
	}


} //class
