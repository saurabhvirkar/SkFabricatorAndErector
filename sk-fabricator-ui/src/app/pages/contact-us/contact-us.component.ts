import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InquiryService } from '../../_services/inquiry.service';
import { Inquiry } from '../../_models/inquiry.model';
import { MapComponent } from '../map/map.component';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { CONTACT_DETAILS } from '../../_constants/contact.constants';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MapComponent ,InquiryFormComponent],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  contact = CONTACT_DETAILS;
}