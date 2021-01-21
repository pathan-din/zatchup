import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Inject } from '@angular/core';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  date: any

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.date = new Date()
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 485 ||
      document.documentElement.scrollTop > 485) {
      document.getElementById('about-us-header').classList.add('Fixed');
    }
    else {
      document.getElementById('about-us-header').classList.remove('Fixed');
    }
  }

  ngOnInit(): void {
  }

  scrollToTargetAdjusted(id) {
    const yOffset = -55;
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

}
