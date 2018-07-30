import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Post } from '../../models/post.interface';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import {DomSanitizer} from '@angular/platform-browser';
import { Address } from '../../models/address.interface';


@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
/**
 * Chzanged Keybord behaviour in  AndroidManifest.xml
 * https://forum.ionicframework.com/t/change-android-keyboard-behaviors-for-the-whole-app/83610 
 */
export class AddPostPage {

  post =  {} as Post;
  tags = [];
  textLeft = 100;
  imageArray = [];
  picture: boolean = false;
  address = {} as Address;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbService: FirebaseServiceProvider, 
              private cameraService: CameraServiceProvider, public _DomSanitizer: DomSanitizer) {

      this.address = navParams.get("address");
  }

  ionViewDidLoad() {
    
  }

  /**
   * Adds a Post to the Database
   * @param post 
   */
  addPost(post: Post){
    this.post.district = this.address.district;
    this.post.city = this.address.cityname;
    this.post.country = this.address.country;
    this.post.created = this.getDate();
  
    this.dbService.createPost(post)
      .then(data =>{
        this.navCtrl.pop();
      })
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

  /**
   * Creates the current Date
   */
  getDate(){
    var today = new Date();
    var ddDate = today.getDate();
    var ddString = ddDate.toString();
    var mmDate = today.getMonth()+1; //January is 0!
    var mmString = mmDate.toString();
    var yyyy = today.getFullYear(); 
    if(ddDate<10) {
      ddString = '0'+ddString
    }    
    if(mmDate<10) {
      mmString = '0'+mmString
    } 
    return ddString + '.' + mmString + '.' + yyyy;
  }

}
