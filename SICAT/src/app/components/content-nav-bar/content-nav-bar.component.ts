import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentNavBarService } from '../../services/content-nav-bar.service';

@Component({
  selector: 'content-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-nav-bar.component.html',
  styleUrls: ['./content-nav-bar.component.scss']
})
export class ContentNavBarComponent implements OnInit {
  currentContent: any = null;

  constructor(private contentNavBarService: ContentNavBarService) {}

  ngOnInit() {
    this.contentNavBarService.content$.subscribe(content => {
      this.currentContent = content;
    });
  }
}
