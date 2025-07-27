import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { Property } from '../types';

interface PropertyFiltersProps {
  properties: Property[];
  onFilteredProperties: (filtered: Property[]) => void;
}

export default function PropertyFilters({ properties, onFilteredProperties }: PropertyFiltersProps) {
  const [filters, setFilters] = useState({
    type: 'all',
    bhk: 'all',
    status: 'all',
    priceRange: 'all',
    transactionType: 'sale'
  });

  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    let filtered = [...properties];

    // Apply filters
    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    if (filters.bhk !== 'all') {
      filtered = filtered.filter(p => p.bhk === parseInt(filters.bhk));
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status);
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => parseInt(p));
      filtered = filtered.filter(p => {
        const price = filters.transactionType === 'sale' ? p.salePrice : p.rentPrice;
        if (!price) return false;
        return price >= min && (max ? price <= max : true);
      });
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    onFilteredProperties(filtered);
  }, [filters, searchTerm, properties, onFilteredProperties]);

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Property Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search properties..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={filters.transactionType}
            onChange={(e) => updateFilter('transactionType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
          </select>
        </div>

        {/* BHK */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">BHK</label>
          <select
            value={filters.bhk}
            onChange={(e) => updateFilter('bhk', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range ({filters.transactionType === 'sale' ? '₹' : '₹/month'})
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => updateFilter('priceRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Prices</option>
            {filters.transactionType === 'sale' ? (
              <>
                <option value="0-3000000">Under ₹30L</option>
                <option value="3000000-5000000">₹30L - ₹50L</option>
                <option value="5000000-8000000">₹50L - ₹80L</option>
                <option value="8000000-">Above ₹80L</option>
              </>
            ) : (
              <>
                <option value="0-20000">Under ₹20k</option>
                <option value="20000-35000">₹20k - ₹35k</option>
                <option value="35000-50000">₹35k - ₹50k</option>
                <option value="50000-">Above ₹50k</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}