import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-skill-meter',
  templateUrl: './skill-meter.component.html',
  styleUrls: ['./skill-meter.component.scss']
})
export class SkillMeterComponent implements OnInit {
  @Input() skill: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  getBarWidth(rating) {
    return `${rating * 10}%`;
  }

}
