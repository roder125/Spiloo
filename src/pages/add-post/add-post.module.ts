import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPostPage } from './add-post';
import { IonTagsInputModule } from "ionic-tags-input";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AddPostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPostPage),
    IonTagsInputModule,
    ComponentsModule
  ],
})
export class AddPostPageModule {}
