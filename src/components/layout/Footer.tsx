
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-5">
              <div className="relative">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-healthcare-600 to-healthcare-400">
                  Avenue
                </span>
                <span className="text-2xl font-bold text-healthcare-900">Healthcare</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-6">
              Providing quality healthcare services with a patient-centered approach. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-healthcare-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-healthcare-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-healthcare-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-healthcare-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Appointments
                </Link>
              </li>
              <li>
                <Link to="/medical-history" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Medical History
                </Link>
              </li>
              <li>
                <Link to="/billing" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Billing
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#general-consultation" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  General Consultation
                </Link>
              </li>
              <li>
                <Link to="/services#specialist-care" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Specialist Care
                </Link>
              </li>
              <li>
                <Link to="/services#diagnostics" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Diagnostics & Laboratory
                </Link>
              </li>
              <li>
                <Link to="/services#emergency" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link to="/services#preventive" className="text-gray-600 hover:text-healthcare-500 transition-colors">
                  Preventive Health
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-healthcare-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Healthcare Avenue, Medical District, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-healthcare-500 flex-shrink-0" />
                <span className="text-gray-600">+254 (123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-healthcare-500 flex-shrink-0" />
                <span className="text-gray-600">contact@avenuehealthcare.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Avenue Healthcare. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-gray-500 hover:text-healthcare-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-healthcare-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-healthcare-500 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
