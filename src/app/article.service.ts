import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Article } from './article';


const httpOptions = {
  headers: new HttpHeaders({  "Content-type": "application/json; charset=UTF-8" })
};


@Injectable()
export class ArticleService {

	result: any;
	private articles: Observable<Article[]>;
	private article: Observable<Article>;

	constructor( private http: HttpClient ) { }


	getAll():Observable<Article[]>{
		return this.http.get<Article[]>('/api/all').pipe(
			tap(articles => console.log(`fetched articles`)),
	  		catchError(this.handleError<Article[]>(`error fetching all articles`))
		)
	}

	getId(id):Observable<Article>{
		return this.http.get<Article>('/api/articles/'+id).pipe(
			tap(article => console.log(`fetched the article with id: ${id}`)),
			catchError(this.handleError<Article>(`error fetching id`))
		)
	}

	// post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>
	addPost(article: Article):Observable<Article>{
		return this.http.post<Article>('/api/add-post', JSON.stringify(article), httpOptions).pipe(
			tap(_ => console.log(`adding article, ${article}, title=${article.title}`)),
			catchError(this.handleError<Article>(`error creating ${article._id}`))
		)
	}

	editPost(article: Article, id):Observable<Article>{
		return this.http.post<Article>('/api/edit/'+id, JSON.stringify(article), httpOptions).pipe(
			tap(_ => console.log(`updating article, ${article}, title=${article.title}`)),
			catchError(this.handleError<Article>(`in service-error editing ${article._id}`))
		)
	}

	deletePost(id):Observable<Article>{
		return this.http.get<Article>('/api/delete/'+id).pipe(
			tap(_ => console.log(`deleting article`)),
			catchError(this.handleError<Article>(`in service-error deleting id`))
		)
	}



	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    // TODO: send the error to remote logging infrastructure
	    console.error("ERROR is:",  error); // log to console instead

	    // TODO: better job of transforming error for user consumption
	    // this.log(`${operation} failed: ${error.message}`);
	    console.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}



}
