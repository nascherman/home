import {Component, AfterContentInit, ElementRef, Input} from '@angular/core';

import animations from './tooltip.animations';

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {WindowRef} from "../../services/window.service";

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

  direction: string = 'right';

  constructor(
    private elementRef: ElementRef,
    private winRef: WindowRef) { }

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

    const { height, x, width } = caption.getBoundingClientRect();

    const captionHeight = caption
      .getBoundingClientRect().height;
    const iconHeight = this.elementRef.nativeElement
      .querySelector('.tooltip__icon')
      .getBoundingClientRect().height;

    caption.style.top = `-${height + padding}px`;


    /*
        if the caption is close to being off the screen in the
        'right' alignment, align it left instead. since we dont
        want the words right at the edge of the screen, add
        arbitrary padding to make it more readable
     */
    const alignmentPadding = 20; // px
    if (width + x + alignmentPadding >= this.winRef.nativeWindow.innerWidth) {
      this.direction = 'left';
    }
  }

  setVisible(visibility) {
    if (visibility) {
      this.positionCaption();
    }

    this.visible = visibility;
  }
}
