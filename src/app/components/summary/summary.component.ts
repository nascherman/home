import { Component, OnInit } from '@angular/core';
import {dispatch, select} from "@angular-redux/store";
import {Observable} from "rxjs/index";
import { AngularFirestore} from "@angular/fire/firestore";

// DATA
import * as config from './summary.config.json';

export class SummaryItem {
  name: string = '';
  category: string = '';
  images: Array<string> = [''];
  details: any = {};
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @select() modalVisibility: Observable<any>;

  config: Array<any> = [];
  sellingCaption: string = `Touch the images below to explore some of
    my work. Touch the category button above the images to filter the results.`;

  protected internalModalVisibility: boolean = false;
  protected currentItem: SummaryItem = new SummaryItem();

  items: Observable<any>;

  constructor(private db: AngularFirestore) {
    db.collection('summary').valueChanges()
      .subscribe(res => {
        this.config = res;
      });
  }

  ngOnInit() {
    this.modalVisibility.subscribe(res => {
      this.internalModalVisibility = res;
    });
  }

  launchModal(data) {
    this.currentItem = data;
    this.toggleModal();
  }

  @dispatch() toggleModal = () => ({type: 'TOGGLE_MODAL'});
}
