import { Component } from '@angular/core';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { LivePreviewComponent } from './live-preview/live-preview.component';
import { PricingSectionComponent } from './pricing-section/pricing-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
@Component({
  selector: 'app-landing-page',
  imports: [
    TestimonialsSectionComponent,
    FeaturesSectionComponent,
    LivePreviewComponent,
    PricingSectionComponent,
    HeroSectionComponent,
    FooterSectionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
