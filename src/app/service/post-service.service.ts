import { Injectable } from "@angular/core";
import { Post } from "../shout-box/Post.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostServiceService {
  //add
  public postAdded_Observable = new Subject();
  //edit
  public postEdit_Observable = new Subject();
  public post_to_be_edited;

  apiURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
    this.post_to_be_edited = new Post();
  }

  //CRUD
  createPost(post: Post) {
    return this.httpClient.post<Post>(this.apiURL + "/api/posts/", post);
  }
  getAllPosts() {
    return this.httpClient.get<Post[]>(this.apiURL + "/api/posts/");
  }
  deletePost(postId) {
    return this.httpClient.delete<number>(this.apiURL + "/api/posts/" + postId);
  }
  updatePost(post: Post) {
    let params = new HttpParams()
      .set("title", post.title)
      .set("description", post.description);
    return this.httpClient.put<Post>(
      this.apiURL + "/api/posts/" + post.id,
      "",
      {
        params: params,
      }
    );
  }
  createComment(postId, authorId, comment) {
    //this.post_to_be_edited = post;
    //this.notifyPostEdit();
    let params = new HttpParams()
      .set("authorId", authorId)
      .set("comment", comment);
    return this.httpClient.post<Comment>(
      this.apiURL + "/api/posts/" + postId + "/comments/",
      "",
      {
        params: params,
      }
    );
  }
  getCommentsForPost(postId) {
    return this.httpClient.get<Comment[]>(this.apiURL + "/api/posts/" + postId);
  }

  //emitting actions

  ////add post

  // Whenever a new blog post is added to the database we call:
  notifyPostAddition() {
    this.postAdded_Observable.next();
  }

  ////edit post

  notifyPostEdit() {
    this.postEdit_Observable.next();
  }

  setPostToEdit(post: Post) {
    this.post_to_be_edited = post;
    console.log("onEditPost: " + JSON.stringify(post, null, 2));
    this.notifyPostEdit();
  }
}
