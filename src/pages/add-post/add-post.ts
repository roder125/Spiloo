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
  textLeft = 100;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbService: FirebaseServiceProvider) {
  }

  ionViewDidLoad() {
   
  }

  addPost(post: Post){

  }

   /**
   * Counts how many Chars a typed in 
   */
  textCounter(){
    var maxLen = 100;
    this.textLeft = maxLen - this.post.content.length;
  }
}
