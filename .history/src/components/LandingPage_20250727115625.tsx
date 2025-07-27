import React, { useState } from 'react';
import {
  MapPin,
  Shield,
  Car,
  Dumbbell,
  Trees,
  Wifi,
  Camera,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import PropertyChart from './Charts/PropertyChart';
import PropertyFilters from './PropertyFilters';
import PropertyCard from './PropertyCard';
import { mockProperties } from '../data/mockData';

export default function LandingPage() {
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [transactionType, setTransactionType] = useState<'sale' | 'rent'>('sale');

  const amenities = [
    { icon: <Shield className="h-6 w-6" />, name: '24/7 Security', description: 'CCTV surveillance and security guards' },
    { icon: <Car className="h-6 w-6" />, name: 'Parking', description: 'Covered parking for residents' },
    { icon: <Dumbbell className="h-6 w-6" />, name: 'Fitness Center', description: 'Modern gym with equipment' },
    { icon: <Trees className="h-6 w-6" />, name: 'Garden Area', description: 'Beautiful landscaped gardens' },
    { icon: <Wifi className="h-6 w-6" />, name: 'High-Speed Internet', description: 'Fiber optic connectivity' },
    { icon: <Camera className="h-6 w-6" />, name: 'CCTV Monitoring', description: 'Complete surveillance system' },
  ];

  const calculateCosts = () => {
    const registrationFee = 50000;
    const monthlyMaintenance = 5000;
    const annualMaintenance = monthlyMaintenance * 12;

    return { registrationFee, monthlyMaintenance, annualMaintenance };
  };

  const costs = calculateCosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Shanti Residency
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Premium Living in the Heart of Lucknow
            </p>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <MapPin className="h-5 w-5" />
              <span>Gomti Nagar Extension, Lucknow, Uttar Pradesh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Property Dashboard Section */}
      <section id="properties" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Property Dashboard</h2>
            <p className="text-lg text-gray-600">Real-time availability and pricing information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <PropertyChart properties={mockProperties} />
            </div>

            <div className="lg:col-span-2">
              {/* Cost Calculator */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Calculator</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Registration Fee</h4>
                    <p className="text-2xl font-bold text-blue-600">₹{costs.registrationFee.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600">One-time payment</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Monthly Maintenance</h4>
                    <p className="text-2xl font-bold text-green-600">₹{costs.monthlyMaintenance.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600">Per month</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Annual Maintenance</h4>
                    <p className="text-2xl font-bold text-purple-600">₹{costs.annualMaintenance.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600">Per year</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Placeholder */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2739.147307048403!2d80.97428789580763!3d26.85581706763056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd30b340f71b%3A0x88e9bdf837b03fe1!2sCSI%20Towers!5e1!3m2!1sen!2sin!4v1753597424884!5m2!1sen!2sin" width="600" height="450" className="borde" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <p className="text-sm text-gray-500">Gomti Nagar Extension, Lucknow</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Last updated: {new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Live updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Filters and Listings */}
          <PropertyFilters
            properties={mockProperties}
            onFilteredProperties={setFilteredProperties}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                transactionType={transactionType}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties match your current filters.</p>
              <p className="text-gray-400">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">World-Class Amenities</h2>
            <p className="text-lg text-gray-600">Everything you need for comfortable living</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    {amenity.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{amenity.name}</h3>
                    <p className="text-gray-600">{amenity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules & Regulations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Society Rules & Regulations</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Visitors must register at the gate with valid ID</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Maintenance fees due by 5th of every month</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">No loud music or parties after 10 PM</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Pets allowed with prior approval from committee</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Common area usage requires advance booking</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety & Security</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-1" />
                  <p className="text-gray-700">24/7 security personnel on duty</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Camera className="h-5 w-5 text-green-600 mt-1" />
                  <p className="text-gray-700">CCTV surveillance in all common areas</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-1" />
                  <p className="text-gray-700">Biometric access control system</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-600 mt-1" />
                  <p className="text-gray-700">Emergency helpline available 24/7</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-1" />
                  <p className="text-gray-700">Fire safety equipment on every floor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-300">Ready to make Shanti Residency your home?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bg-blue-600 rounded-lg w-fit mx-auto mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+91 522-123-4567</p>
              <p className="text-gray-300">+91 9876543210</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-blue-600 rounded-lg w-fit mx-auto mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300">info@shantiresidency.com</p>
              <p className="text-gray-300">sales@shantiresidency.com</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-blue-600 rounded-lg w-fit mx-auto mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-300">Shanti Residency</p>
              <p className="text-gray-300">Gomti Nagar Extension</p>
              <p className="text-gray-300">Lucknow, UP 226010</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2025 Shanti Residency. All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-400">
              Developed with ❤️ for modern living
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}