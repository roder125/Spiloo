import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Post } from '../../models/post.interface';


@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  post =  {} as Post;
  tags = [];
  textLeft = 100;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbService: FirebaseServiceProvider) {
  }

  ionViewDidLoad() {
   
  }

  /**
   * Adds a Post to the Database
   * @param post 
   */
  addPost(post: Post){
    console.log(post)
  }

   /**
   * Counts how many Chars a typed in 
   */
  textCounter(){
    var maxLen = 100;
    this.textLeft = maxLen - this.post.content.length;
  }

  /**
   * When a Tag is addeted or deleted
   * @param val 
   */
  onTagChange(val){
    this.post.tags = val;
  }
}
