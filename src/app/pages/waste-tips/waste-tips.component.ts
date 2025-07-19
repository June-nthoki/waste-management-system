import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-waste-tips',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-neutral-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Waste Management Tips</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Learn best practices for responsible waste disposal and help create a cleaner, more sustainable community
          </p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12">
        <!-- Quick Tips Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-2xl text-success-600">recycling</span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-3">Separate Recyclables</h3>
            <p class="text-neutral-600">
              Keep paper, plastic, glass, and metal separate to improve recycling efficiency and reduce contamination.
            </p>
          </div>

          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-2xl text-warning-600">schedule</span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-3">Follow Collection Schedule</h3>
            <p class="text-neutral-600">
              Put bins out on the correct day and time to ensure timely collection and avoid missed pickups.
            </p>
          </div>

          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-2xl text-error-600">dangerous</span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-3">Handle Hazardous Waste</h3>
            <p class="text-neutral-600">
              Dispose of batteries, chemicals, and electronics at designated facilities to protect the environment.
            </p>
          </div>

          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-2xl text-primary-600">reduce_capacity</span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-3">Reduce & Reuse</h3>
            <p class="text-neutral-600">
              Minimize waste by choosing reusable items and avoiding single-use products whenever possible.
            </p>
          </div>

          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-2xl text-secondary-600">compost</span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-3">Compost Organic Waste</h3>
            <p class="text-neutral-600">
              Turn food scraps and yard waste into nutrient-rich compost for your garden or local programs.
            </p>
          </div>

          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-2xl text-accent-600">local_shipping</span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-3">Bulk Item Pickup</h3>
            <p class="text-neutral-600">
              Schedule special pickups for large items like furniture and appliances instead of illegal dumping.
            </p>
          </div>
        </div>

        <!-- Detailed Sections -->
        <div class="space-y-12">
          <!-- Recycling Guidelines -->
          <section class="card p-8">
            <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
              <span class="material-icons text-success-600 mr-3">recycling</span>
              Recycling Guidelines
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-lg font-semibold text-success-600 mb-3">✅ What to Recycle</h3>
                <ul class="space-y-2 text-neutral-700">
                  <li>• Clean paper and cardboard</li>
                  <li>• Plastic bottles and containers (check numbers)</li>
                  <li>• Glass bottles and jars</li>
                  <li>• Aluminum and steel cans</li>
                  <li>• Newspapers and magazines</li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-error-600 mb-3">❌ What NOT to Recycle</h3>
                <ul class="space-y-2 text-neutral-700">
                  <li>• Food-contaminated containers</li>
                  <li>• Plastic bags and film</li>
                  <li>• Broken glass or ceramics</li>
                  <li>• Electronics (use e-waste centers)</li>
                  <li>• Hazardous materials</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Hazardous Waste -->
          <section class="card p-8">
            <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
              <span class="material-icons text-error-600 mr-3">dangerous</span>
              Hazardous Waste Disposal
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="p-4 bg-error-50 rounded-lg">
                <h3 class="font-semibold text-error-800 mb-2">Household Chemicals</h3>
                <p class="text-sm text-error-700">Paint, solvents, pesticides, and cleaning products</p>
              </div>
              <div class="p-4 bg-warning-50 rounded-lg">
                <h3 class="font-semibold text-warning-800 mb-2">Electronics</h3>
                <p class="text-sm text-warning-700">Computers, phones, batteries, and appliances</p>
              </div>
              <div class="p-4 bg-secondary-50 rounded-lg">
                <h3 class="font-semibold text-secondary-800 mb-2">Automotive</h3>
                <p class="text-sm text-secondary-700">Motor oil, antifreeze, and car batteries</p>
              </div>
            </div>
            <div class="mt-6 p-4 bg-neutral-100 rounded-lg">
              <p class="text-neutral-700">
                <span class="material-icons text-sm mr-1">info</span>
                <strong>Important:</strong> Never put hazardous waste in regular trash. Contact your local waste management facility for proper disposal locations and schedules.
              </p>
            </div>
          </section>

          <!-- Composting -->
          <section class="card p-8">
            <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
              <span class="material-icons text-success-600 mr-3">compost</span>
              Composting Basics
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-lg font-semibold text-success-600 mb-3">Green Materials (Nitrogen)</h3>
                <ul class="space-y-2 text-neutral-700">
                  <li>• Fruit and vegetable scraps</li>
                  <li>• Coffee grounds and tea bags</li>
                  <li>• Fresh grass clippings</li>
                  <li>• Plant trimmings</li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-warning-600 mb-3">Brown Materials (Carbon)</h3>
                <ul class="space-y-2 text-neutral-700">
                  <li>• Dry leaves and twigs</li>
                  <li>• Shredded paper and cardboard</li>
                  <li>• Sawdust and wood chips</li>
                  <li>• Straw and hay</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Emergency Contacts -->
          <section class="card p-8 bg-primary-50 border-primary-200">
            <h2 class="text-2xl font-bold text-primary-800 mb-6 flex items-center">
              <span class="material-icons text-primary-600 mr-3">contact_phone</span>
              Emergency & Contact Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold text-primary-800 mb-3">Emergency Situations</h3>
                <ul class="space-y-2 text-primary-700">
                  <li>• Hazardous spills: Call 911</li>
                  <li>• Illegal dumping: Report immediately</li>
                  <li>• Overflowing bins: Contact waste services</li>
                </ul>
              </div>
              <div>
                <h3 class="font-semibold text-primary-800 mb-3">Regular Services</h3>
                <ul class="space-y-2 text-primary-700">
                  <li>• Waste Services: (555) 123-4567</li>
                  <li>• Recycling Info: (555) 123-4568</li>
                  <li>• Bulk Pickup: (555) 123-4569</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `
})
export class WasteTipsComponent { }