import {Component, AfterContentInit, ElementRef, Input} from '@angular/core';

import animations from './tooltip.animations';

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations
})
export class TooltipComponent implements AfterContentInit  {

  @Input() caption: string;

  visible: boolean = false;
  faInfoCircle: any = faInfoCircle;

  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit() {
    this.positionCaption();
  }

  private positionCaption() {
    // arbitrary padding between icon and caption in px
    const padding = parseInt(
      getComputedStyle(this.elementRef.nativeElement).fontSize
    ) / 3;

    const caption = this.elementRef.nativeElement
      .querySelector('.tooltip__caption');
    const captionHeight = caption
      .getBoundingClientRect().height;
    const iconHeight = this.elementRef.nativeElement
      .querySelector('.tooltip__icon')
      .getBoundingClientRect().height;

    caption.style.top = `-${captionHeight + padding}px`;
  }

  setVisible(visibility) {
    if (visibility) {
      this.positionCaption();
    }

    this.visible = visibility;
  }
}
