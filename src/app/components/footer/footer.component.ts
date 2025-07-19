import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-neutral-800 text-neutral-300">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="material-icons text-white text-lg">eco</span>
              </div>
              <span class="font-bold text-xl text-white">WasteFlow</span>
            </div>
            <p class="text-sm text-neutral-400">
              Making waste management efficient and transparent for communities worldwide.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors">
                <span class="sr-only">Twitter</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-semibold text-white mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/waste-tips" class="hover:text-primary-500 transition-colors">Waste Tips</a></li>
              <li><a routerLink="/about" class="hover:text-primary-500 transition-colors">About Us</a></li>
              <li><a routerLink="/contact" class="hover:text-primary-500 transition-colors">Contact</a></li>
              <li><a routerLink="/help" class="hover:text-primary-500 transition-colors">Help Center</a></li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h3 class="font-semibold text-white mb-4">Services</h3>
            <ul class="space-y-2 text-sm">
              <li><span class="text-neutral-400">Waste Collection</span></li>
              <li><span class="text-neutral-400">Recycling Programs</span></li>
              <li><span class="text-neutral-400">Bulk Item Pickup</span></li>
              <li><span class="text-neutral-400">Hazardous Waste</span></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="font-semibold text-white mb-4">Contact Info</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center space-x-2">
                <span class="material-icons text-xs">phone</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="material-icons text-xs">email</span>
                <span>support@wasteflow.com</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="material-icons text-xs">location_on</span>
                <span>123 Green St, Eco City</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="material-icons text-xs">schedule</span>
                <span>24/7 Emergency Line</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr class="border-neutral-700 my-8">
        
        <div class="flex flex-col md:flex-row justify-between items-center text-sm">
          <p class="text-neutral-400">
            © 2025 WasteFlow. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a routerLink="/privacy" class="text-neutral-400 hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a routerLink="/terms" class="text-neutral-400 hover:text-primary-500 transition-colors">Terms of Service</a>
            <a routerLink="/cookies" class="text-neutral-400 hover:text-primary-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }