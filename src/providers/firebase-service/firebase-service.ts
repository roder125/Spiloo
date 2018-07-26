import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseServiceProvider {

  private postListRef$ = this.db.list<any>('post-list');

  constructor(private db: AngularFireDatabase) {
   
  }

  /**
   * Creates a Post in the Database
   */
  createPost(post){
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
  getPost(){

  }

}
