import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashtagExtractorService {

  extractHashtags(text: string): string{
    if (!text) {
      return '';
    }

    const hashtagRegex = /#\w+/g;
    const matches = text.match(hashtagRegex);
    const result = matches ? matches.map(tag => tag.trim()) : [];
    const resultString: string = result.join(",");
    return resultString;
  }

  removeHashtags(text: string): string {
    return text.replace(/#\S+/g, '').trim();
  }
}
