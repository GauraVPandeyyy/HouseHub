import React from 'react';
import { Home, MapPin, Bed, Square } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  transactionType: 'sale' | 'rent';
}

export default function PropertyCard({ property, transactionType }: PropertyCardProps) {
  const price = transactionType === 'sale' ? property.salePrice : property.rentPrice;
  const formatPrice = (amount: number) => {
    if (transactionType === 'sale') {
      if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
      if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
      return `₹${amount.toLocaleString('en-IN')}`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}/month`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-green-100 text-green-800';
      case 'vacant': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!price) return null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <Home className="h-16 w-16 text-white opacity-50" />
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {property.bhk} BHK {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Floor {property.floor === 0 ? 'Ground' : property.floor}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">
              {formatPrice(price)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 py-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bhk} BHK</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.area} sq ft</span>
            </div>
          </div>
        </div>

        {property.owner && (
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Owner:</span> {property.owner}
          </div>
        )}

        <div className="mt-4">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
            Contact for Details
          </button>
        </div>
      </div>
    </div>
  );
}