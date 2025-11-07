import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class ContactMapComponent implements OnInit {

  private sanitizer = inject(DomSanitizer);
  // ✅ Correct Google Maps Embed URL
  mapEmbedString ='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.755009327827!2d73.76234127496043!3d18.60983788250992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b93ad619c783%3A0x74ec98edacfaf31e!2sS%20K%20FABRICATOR%20AND%20ERECTOR!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  safeMapUrl!: SafeResourceUrl;

  ngOnInit(): void {
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapEmbedString);
  }
}
