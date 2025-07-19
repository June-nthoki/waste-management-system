import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div class="container mx-auto px-4 py-20">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Waste Management for
              <span class="text-primary-200">Cleaner Communities</span>
            </h1>
            <p class="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Report waste issues, track cleanup progress, and help build sustainable communities through our intelligent waste management platform.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a routerLink="/signup" class="btn btn-lg bg-white text-primary-600 hover:bg-primary-50 font-semibold">
                <span class="material-icons mr-2">eco</span>
                Get Started Today
              </a>
              <a routerLink="/waste-tips" class="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                <span class="material-icons mr-2">info</span>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              How WasteFlow Works
            </h2>
            <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our platform connects citizens, waste management teams, and administrators to create efficient, transparent waste management solutions.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="card p-8 text-center group">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors">
                <span class="material-icons text-2xl text-primary-600 group-hover:text-white transition-colors">report</span>
              </div>
              <h3 class="text-xl font-semibold text-neutral-800 mb-4">Report Issues</h3>
              <p class="text-neutral-600">
                Easily report waste management issues with photos, descriptions, and location details. Your reports help keep communities clean.
              </p>
            </div>
            
            <div class="card p-8 text-center group">
              <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary-600 transition-colors">
                <span class="material-icons text-2xl text-secondary-600 group-hover:text-white transition-colors">assignment</span>
              </div>
              <h3 class="text-xl font-semibold text-neutral-800 mb-4">Track Progress</h3>
              <p class="text-neutral-600">
                Monitor the status of your reports in real-time. Get notifications when tasks are assigned and completed by our waste teams.
              </p>
            </div>
            
            <div class="card p-8 text-center group">
              <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-600 transition-colors">
                <span class="material-icons text-2xl text-accent-600 group-hover:text-white transition-colors">groups</span>
              </div>
              <h3 class="text-xl font-semibold text-neutral-800 mb-4">Community Impact</h3>
              <p class="text-neutral-600">
                Be part of a community-driven solution. Your participation helps create cleaner, healthier neighborhoods for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Waste Tips Section -->
      <section class="py-20 bg-neutral-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Quick Waste Management Tips
            </h2>
            <p class="text-xl text-neutral-600">
              Simple actions that make a big difference
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <span class="material-icons text-success-600">recycling</span>
              </div>
              <h3 class="font-semibold text-neutral-800 mb-2">Separate Recyclables</h3>
              <p class="text-sm text-neutral-600">
                Keep paper, plastic, glass, and metal separate to improve recycling efficiency.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <span class="material-icons text-warning-600">schedule</span>
              </div>
              <h3 class="font-semibold text-neutral-800 mb-2">Follow Collection Schedule</h3>
              <p class="text-sm text-neutral-600">
                Put bins out on the correct day and time to ensure timely collection.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center mb-4">
                <span class="material-icons text-error-600">dangerous</span>
              </div>
              <h3 class="font-semibold text-neutral-800 mb-2">Handle Hazardous Waste</h3>
              <p class="text-sm text-neutral-600">
                Dispose of batteries, chemicals, and electronics at designated facilities.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span class="material-icons text-primary-600">reduce_capacity</span>
              </div>
              <h3 class="font-semibold text-neutral-800 mb-2">Reduce & Reuse</h3>
              <p class="text-sm text-neutral-600">
                Minimize waste by choosing reusable items and avoiding single-use products.
              </p>
            </div>
          </div>
          
          <div class="text-center mt-12">
            <a routerLink="/waste-tips" class="btn btn-primary">
              <span class="material-icons mr-2">eco</span>
              View All Tips
            </a>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-20 bg-primary-600 text-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Making a Real Impact
            </h2>
            <p class="text-xl text-primary-100">
              See how our community is making a difference
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl md:text-5xl font-bold mb-2">2,547</div>
              <div class="text-primary-200">Issues Reported</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold mb-2">2,301</div>
              <div class="text-primary-200">Issues Resolved</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold mb-2">96%</div>
              <div class="text-primary-200">Resolution Rate</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold mb-2">1,234</div>
              <div class="text-primary-200">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Ready to Make a Difference?
          </h2>
          <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens already using WasteFlow to create cleaner, more sustainable communities.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/signup" class="btn btn-primary btn-lg">
              <span class="material-icons mr-2">person_add</span>
              Sign Up Now
            </a>
            <a routerLink="/login" class="btn btn-outline btn-lg">
              <span class="material-icons mr-2">login</span>
              Sign In
            </a>
          </div>
        </div>
      </section>
    </main>
    
    <app-footer></app-footer>
  `
})
export class HomeComponent { }