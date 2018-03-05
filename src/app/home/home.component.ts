import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article'; //defines the type


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	articles: Article[];

	constructor(private articleService: ArticleService) { }

	ngOnInit() {
		this.articleService.getAll().subscribe(
			articles => this.articles = articles,
			error => console.log('error getting articles')
		)
	}

}
