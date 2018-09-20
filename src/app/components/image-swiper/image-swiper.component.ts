import {
  AfterContentChecked, AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';

import {faCircle as faCircleSolid} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/fontawesome-free-regular";

import ID from '../../../utils/id';

import animations from './image-swiper.animations';

const PAN_DIRECTIONS = {
  LEFT: 4,
  RIGHT: 2
};

class InternalImage {
  id: string;
  image: string;
  animationState: any;

  constructor(image: string) {
    this.id = ID();
    this.image = image;
    this.animationState = {};
  }
}

@Component({
  selector: 'app-image-swiper',
  templateUrl: './image-swiper.component.html',
  styleUrls: ['./image-swiper.component.scss'],
  animations
})
export class ImageSwiperComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked {
  @Input() images: Array<any>;

  @ViewChild('component') component: ElementRef;

  internalImageArray: Array<InternalImage>;
  pageIcons: Array<any>;

  currentImage: any;
  offsetBegin: number = 0;
  panDirection: string;

  constructor() {
  }

  ngOnInit() {
    this.internalImageArray = this.getInternalImageArray(this.images);
    // set default image to first image
    this.currentImage = this.internalImageArray[0];
    this.setImageAnimations();
    this.setCircleIcons();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.images) {
      this.internalImageArray = this.getInternalImageArray(changes.images.currentValue);
      this.currentImage = this.internalImageArray[0];
      this.setImageAnimations();
      this.setCircleIcons();
    }
  }

  ngAfterContentInit() {
    this.setParentWidth();
  }

  ngAfterContentChecked() {
    this.setParentWidth();
  }

  private getInternalImageArray(images) {
    const tempArr: Array<InternalImage> = [];

    images.forEach(img => {
      tempArr.push(new InternalImage(img))
    });

    return tempArr;
  }

  /**
   * defaults to 0
   * @param image
   * @returns {number}
   */
  private getImageIndex(image) {
    const index = this.internalImageArray.map(img => {
      return img.id;
    }).indexOf(image.id);

    return index >= 0 ? index : 0;
  }

  private getImgElDimensions(imageEl) {
    const width = imageEl.clientWidth;
    const height = imageEl.clientHeight;

    return {width, height};
  };

  private setParentWidth() {
    const imageEl = this.component.nativeElement.querySelector('img');

    const containerWidth = this.component.nativeElement.getBoundingClientRect().width;

    if (imageEl) {
      const {width, height} = this.getImgElDimensions(imageEl);
      const imageRatio = width / height;

      this.component.nativeElement.style.height = `${containerWidth / imageRatio}px`;
    }
  }

  /**
   * SIDE effects - set the animation state for each image
   */
  setImageAnimations() {
    this.internalImageArray.forEach(image => {
      image.animationState = this.getAnimation(image)
    });
  }

  setCircleIcons() {
    this.pageIcons = [];
    this.internalImageArray.forEach(image => {
      image.id === this.currentImage.id ?
        this.pageIcons.push(faCircle) :
        this.pageIcons.push(faCircleSolid);
    });
  }

  moveRight() {
    this.panDirection = 'right';
    const currentImageIndex = this.getImageIndex(this.currentImage);

    if (currentImageIndex < this.images.length - 1) {
      this.currentImage = this.internalImageArray[currentImageIndex + 1];

      this.setImageAnimations();
      this.setCircleIcons();
    }
  }

  moveLeft() {
    this.panDirection = 'left';
    const currentImageIndex = this.getImageIndex(this.currentImage);

    if (currentImageIndex > 0) {
      this.currentImage = this.internalImageArray[currentImageIndex - 1];

      this.setImageAnimations();
      this.setCircleIcons();
    }
  }

  /**
   * returns the animation value for the current image
   * @param image
   * @returns {string}
   */
  getAnimation(subjectImage): any {
    const currentImageIndex = this.getImageIndex(this.currentImage);
    const subjectImageIndex = this.getImageIndex(subjectImage);

    const containerWidth = this.component.nativeElement.clientWidth;

    let direction: string;

    if (subjectImage.id === this.currentImage.id) {
      direction = 'in';
    } else if (subjectImageIndex < currentImageIndex) {
      direction = 'left';
    } else {
      direction = 'right';
    }

    const previousState = subjectImage.animationState.value || direction;

    let offsetBegin: number;

    if(previousState === 'in') {
      offsetBegin = direction === 'left' ?
        -this.offsetBegin :
        this.offsetBegin;
    } else if (direction === 'in') {
      offsetBegin = previousState === 'left' ?
        -containerWidth + this.offsetBegin :
        containerWidth - this.offsetBegin;
    }

    return {
      value: direction,
      previousState,
      params: {
        offsetBegin
      }
    }
  }

  /**
   * Get width of image. Since all images are sized the same,
   * just return the first
   * @param image
   */
  getWidthOfEl(image) {
    const imageEl = image.querySelector('img') || {};
    return `${imageEl.clientWidth || 0}px`;
  }

  getHeightOfEl(image) {
    const imageEl = image.querySelector('img') || {};
    return `${imageEl.clientHeight || 0}px`;
  }

  onPan($event, panEl) {
    const containerWidth = this.component.nativeElement.clientWidth;

    // prevent panning past the container distance
    const distance = $event.distance > containerWidth ?
      containerWidth :
      $event.distance;

    switch ($event.direction) {
      case PAN_DIRECTIONS.LEFT:
        panEl.style.left = `${distance}px`;
        break;
      case PAN_DIRECTIONS.RIGHT:
        panEl.style.left = `-${distance}px`;
        break;
      default:
        return null;
    }
  }

  onPanEnd($event, panEl) {
    const panDistance = -parseInt(panEl.style.left);
    panEl.style.left = 0;

    const componentWidth = this.component.nativeElement.clientWidth;
    // pan gt than 25% of total width, pan carousel
    if ($event.distance >= componentWidth / 4) {
      if (panDistance > componentWidth || panDistance < -componentWidth) {
        this.offsetBegin = componentWidth
      } else {
        this.offsetBegin = +($event.distance);
      }

      switch ($event.offsetDirection) {
        case PAN_DIRECTIONS.LEFT:
          this.moveLeft();
          break;
        case PAN_DIRECTIONS.RIGHT:
          this.moveRight();
          break;
        default:
          return null;
      }
    }
  }
}
