import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  date: any;
  serverVideoUrl: any;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { 
    this.date = new Date()
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 485 ||
      document.documentElement.scrollTop > 485) {
      document.getElementById('services-header').classList.add('Fixed');
    }
    else {
      document.getElementById('services-header').classList.remove('Fixed');
    }
  }

  ngOnInit(): void {
    this.serverVideoUrl = environment.serverVideoPath
  }

  scrollToTargetAdjusted(id) {
    const yOffset = -55;
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
