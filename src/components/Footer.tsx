import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

type FooterProps = {
  onNavigate: (view: 'menu' | 'about' | 'support') => void;
  isDarkMode?: boolean;
};

export function Footer({ onNavigate, isDarkMode = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`transition-colors duration-300 mt-16 sticky bottom-0 ${isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-900'} text-gray-100 z-20`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="mb-2">
              <img src="/assets/icon.jpeg" alt="Chicko Chicken" className="h-6 w-14 mb-2" />
              <p className="text-gray-400 text-sm">
                Serving delicious, authentic chicken dishes with passion since 2020.
              </p>
            </div>
            <div className="flex gap-3 mt-3">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="text-gray-400 text-sm hover:text-orange-500 transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-400 text-sm hover:text-orange-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('support')}
                  className="text-gray-400 text-sm hover:text-orange-500 transition-colors"
                >
                  Support
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-orange-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-orange-500 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-white">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">support@chickochicken.com</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">123 Main Street</p>
                  <p className="text-gray-400 text-sm">City, State 12345</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-white">Business Hours</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>11 AM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>11 AM - 11 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>11 AM - 10 PM</span>
              </li>
              <li className="pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-500">Closed on major holidays</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile View - Compact */}
        <div className="md:hidden pb-1">
          <div className="flex justify-center gap-4 mb-2 text-xs">
            <button
              onClick={() => onNavigate('menu')}
              className="text-gray-400 text-xs hover:text-orange-500 transition-colors"
            >
              Menu
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="text-gray-400 text-xs hover:text-orange-500 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('support')}
              className="text-gray-400 text-xs hover:text-orange-500 transition-colors"
            >
              Support
            </button>
            <a href="#" className="text-gray-400 text-xs hover:text-orange-500 transition-colors">
              Privacy
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-3 pb-1">
          {/* Newsletter Signup - Hidden on Mobile */}
          <div className="hidden md:block mb-4">
            <h3 className="text-sm font-semibold mb-2 text-white">Subscribe to Newsletter</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-1.5 text-sm rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 text-xs">
            <p className="text-gray-400">
              &copy; {currentYear} Chicko Chicken. All rights reserved.
            </p>
            <div className="hidden md:flex gap-4 text-gray-400">
              <a href="#" className="hover:text-orange-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
