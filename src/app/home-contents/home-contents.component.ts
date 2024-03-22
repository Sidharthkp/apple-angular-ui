import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

interface Content {
  id: number;
  title: { name: string, color: string };
  sub_title: { name: string, color: string };
  hyperlinks: { title: string; link: string, color: string }[];
  url: { width: number; height: number; link: string }[];
  background: string;
  responsiveImageUrl: string;
}

@Component({
  selector: 'app-home-contents',
  templateUrl: './home-contents.component.html',
  styleUrls: ['./home-contents.component.css']
})


export class HomeContentsComponent {

  contents: any = null

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getContents().subscribe({
      next: (data: any) => {
        this.contents = data;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  getResponsiveImageUrl(content: Content): string {
    if (window.innerWidth <= 768 && content.url && content.url.length > 0) {
      return content?.url?.[0]?.link; // Set the image source for smaller screens
    } else {
      return content?.url?.[1]?.link; // Set the image source for larger screens
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update image source on window resize
    this.contents.forEach((content: Content) => {
      content.responsiveImageUrl = this.getResponsiveImageUrl(content);
    });
  }
}
