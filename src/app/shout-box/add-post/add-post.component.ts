import { PostServiceService } from "../../service/post-service.service";
import { Router } from "@angular/router";
import { Post } from "../Post.model";
import Swal from "sweetalert2";

import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.scss"],
})
export class AddPostComponent implements OnInit {
  currentUser: any;
  post: Post;

  constructor(
    private postServiceService: PostServiceService,
    private router: Router
  ) {
    this.post = new Post();
  }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem("username");
    this.postServiceService.postEdit_Observable.subscribe((response) => {
      this.post = this.postServiceService.post_to_be_edited;
    });
  }
  onSavePost() {
    this.post.author_username = this.currentUser;
    //console.log("this post = " + JSON.stringify(this.post, null, 2));
    if (this.post.id) {
      this.postServiceService.updatePost(this.post).subscribe(
        (response) => {
          this.postServiceService.notifyPostAddition();
          Swal.fire({
            icon: "success",
            title: "Post Edited",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while updating your post!",
            // footer: '<a href>Why do I have this issue?</a>'
          });
        }
      );
    } else {
      this.postServiceService.createPost(this.post).subscribe(
        (response) => {
          console.log("added post: " + JSON.stringify(response, null, 2));
          Swal.fire({
            icon: "success",
            title: "Post saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.postServiceService.notifyPostAddition();
        },
        (error) => {
          alert("Something went wrong");
        }
      );
    }
  }
  onCancelEditorCreatePost() {
    this.postServiceService.setPostToEdit(new Post());
  }
}
