import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PlacesSearchbarComponent } from './places-searchbar/places-searchbar';
import { CommonModule } from '../../node_modules/@angular/common';

@NgModule({
	declarations: [PlacesSearchbarComponent],
	imports: [	CommonModule,
				IonicModule
			 ],
	exports: [PlacesSearchbarComponent]
})
export class ComponentsModule {}
