import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the ChapterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chapter',
  templateUrl: 'chapter.html',
})
export class ChapterPage {

  private toc: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events : Events) {
    this.toc = navParams.data.toc;
  }

  selectToc(content){
    this.events.publish('select:toc', content);
    this.navCtrl.pop();
  }

}
