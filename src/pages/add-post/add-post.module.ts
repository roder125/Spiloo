import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPostPage } from './add-post';
import { IonTagsInputModule } from "ionic-tags-input";

@NgModule({
  declarations: [
    AddPostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPostPage),
    IonTagsInputModule
  ],
})
export class AddPostPageModule {}
