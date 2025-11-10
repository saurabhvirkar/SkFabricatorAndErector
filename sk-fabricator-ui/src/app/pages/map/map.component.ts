import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  template: `
    <div style="width: 100%; height: 100%;">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Space+Needle,Seattle+WA"
        allowfullscreen>
      </iframe>
    </div>
  `,
  standalone: true,
})
export class MapComponent {}