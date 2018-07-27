import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Post } from '../../models/post.interface';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import {DomSanitizer} from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  post =  {} as Post;
  tags = [];
  textLeft = 100;
  imageArray = [];
  picture: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbService: FirebaseServiceProvider, 
              private cameraService: CameraServiceProvider, public _DomSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
   
  }

  /**
   * Adds a Post to the Database
   * @param post 
   */
  addPost(post: Post){
    console.log(post);
    //this.dbService.createPost(post);
  }

   /**
   * Counts how many Chars a typed in 
   */
  textCounter(){
    var maxLen = 100;
    this.textLeft = maxLen - this.post.content.length;
  }

  captureMedia(){
    this.cameraService.takePicture()
      .then((imageData)=>{
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageArray.push(base64Image);
        this.picture = true; 
      })
      .catch(e=>{
        alert(e.message)
      })
  }

  /**
   * When a Tag is addeted or deleted
   * @param val 
   */
  onTagChange(val){
    var tmpArray = [];
    val.forEach((el: string) =>{
      var str = el.replace(/\s/g, "") 
      tmpArray.push(str)
    });

    this.tags = tmpArray;
    this.post.tags = this.tags;
  }

}
