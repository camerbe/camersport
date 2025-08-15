import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.css'
})
export class SocialShareComponent {
  @Input() title!: string;
  @Input() url!: string;
  @Input() media!:string;
  @Input() hashtags: string[] = [];

  encode(value: string): string {
    return encodeURIComponent(value);
  }
  get twitterUrl(): string {
    const cleanedHashtags = this.hashtags.map(tag => tag.replace('#','')).join(',');
    
    const mediaParam = this.media ? `&media=${this.encode(this.media)}` : '';
    return `https://x.com/intent/post?text=${this.encode(this.title)}&url=${this.encode(this.url)}&hashtags=${cleanedHashtags}${mediaParam}`;
  }
  get facebookUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.encode(this.url)}`;
  }
  get linkedinUrl(): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${this.encode(this.url)}`;
  }
  get whatsappUrl(): string {
    return `https://api.whatsapp.com/send?text=${this.encode(this.title)} ${this.encode(this.url)}`;
  }
  get telegramUrl(): string {
    return `https://t.me/share/url?url=${this.encode(this.url)}&text=${this.encode(this.title)}`;
  }
  get emailUrl(): string {
    return `mailto:?subject=${this.encode(this.title)}&body=${this.encode(this.url)}`;
  }
  get pinterestUrl(): string {
    return `https://pinterest.com/pin/create/button/?url=${this.encode(this.url)}&description=${this.encode(this.title)}`;
  }


}
