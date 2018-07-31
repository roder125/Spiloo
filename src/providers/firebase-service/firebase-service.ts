import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Post } from "../../models/post.interface";
import * as firebase from 'firebase';

@Injectable()
export class FirebaseServiceProvider {

  private postListRef$ = this.db.list<any>('post-list');
  post = {} as Post;

  constructor(private db: AngularFireDatabase) {
   
  }

  /**
   * Creates a Post in the Database
   */
  createPost(post: Post){
    return this.postListRef$.push({
      post: post
    });
  }

  /**
   * Changes a Post in the Database
   */
  changePost(){

  }

  /**
   * Deleates a Post in the Database
   */
  deletePost(){

  }

  /**
   * Gets the Posts from the Database
   */
  getPosts(){
    return firebase.database().ref("post-list");
  }

}
