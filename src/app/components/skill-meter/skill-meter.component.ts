import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {dispatch} from "@angular-redux/store";

@Component({
  selector: 'app-skill-meter',
  templateUrl: './skill-meter.component.html',
  styleUrls: ['./skill-meter.component.scss']
})
export class SkillMeterComponent implements OnInit {
  @Input() skill: any;
  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();

  private isVisible: boolean = false;
  private observer: IntersectionObserver;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // no IE compatibility
    if (IntersectionObserver) {
      this.observer = new IntersectionObserver(
        entries => this.handleIntersection(entries)
      );

      this.observer.observe(this.elementRef.nativeElement);
    } else {
      this.handleScrollIntoView();
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        this.handleScrollIntoView();
      }
    });
  }

  handleScrollIntoView() {
    this.isVisible = true;
  }

  getBarWidth(rating, element) {
    const containerWidth = element.clientWidth;
    const labelWidth = element.querySelector('.bar__label')
      .getBoundingClientRect().width;

    return `${(containerWidth - labelWidth) * (rating / 10)}px`
  }

  toggleModal(subSkill: any) {
    this.clickItem.emit(subSkill)
  }
}
