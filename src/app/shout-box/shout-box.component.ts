import { PostServiceService } from "../service/post-service.service";
import { Router } from "@angular/router";
import { Post } from "./Post.model";
import { Comment } from "./Comment.model";
import Swal from "sweetalert2";

import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "app-shout-box",
  templateUrl: "./shout-box.component.html",
  styleUrls: ["./shout-box.component.scss"],
})
export class ShoutBoxComponent implements OnInit {
  currentUser: any;
  post_to_delete: Post;
  allPosts = [];
  isReadMoremodus = false;
  comment: Comment;
  comments = [];

  constructor(
    private postServiceService: PostServiceService //   private router: Router
  ) {
    this.comment = new Comment();
    //   this.post = new Post();
  }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem("username");
    this.getAllPosts();
    this.postServiceService.postAdded_Observable.subscribe((res) => {
      this.getAllPosts();
    });
  }

  getAllPosts() {
    this.postServiceService.getAllPosts().subscribe(
      (response) => {
        this.allPosts = response;
        // this.sortBypublishedOnDate();
        // console.log("posts after sort: " + this.allPosts);
      },
      (error) => {
        alert("Something went wrong");
      }
    );
  }
  OntoggleReadMore(postId: number) {
    let post = this.allPosts.find((x) => x.id === postId);
    post.isReadMoremodus = !post.isReadMoremodus;
  }
  // setPostToDelete() {
  // }
  onDeletePost(post: Post) {
    this.post_to_delete = post;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this post!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.postServiceService.deletePost(this.post_to_delete.id).subscribe(
          (response) => {
            this.getAllPosts();
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          },
          (error) => {
            alert("Something went wrong");
            this.unsetDelete();
          }
        );
      } else {
        this.unsetDelete();
      }
    });
  }

  unsetDelete() {
    this.post_to_delete = null;
  }

  onEditPost(post: Post) {
    this.postServiceService.setPostToEdit(post);
  }

  onComment(post: Post) {
    let authorId = post.author.id;
    let postId = post.id;
    this.postServiceService
      .createComment(postId, authorId, this.comment.description)
      .subscribe((response) => {
        console.log("RESPONSE: " + JSON.stringify(response));
      });
  }
  getCommentsForPost(PostId) {
    this.postServiceService.getCommentsForPost(PostId).subscribe((response) => {
      this.comments = response;
    });
  }
}
