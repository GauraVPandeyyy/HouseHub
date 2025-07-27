import React from 'react';
import { Property } from '../../types';

interface PropertyChartProps {
  properties: Property[];
}

export default function PropertyChart({ properties }: PropertyChartProps) {
  const occupied = properties.filter(p => p.status === 'occupied').length;
  const vacant = properties.filter(p => p.status === 'vacant').length;
  const maintenance = properties.filter(p => p.status === 'maintenance').length;
  const total = properties.length;

  const occupiedPercentage = (occupied / total) * 100;
  const vacantPercentage = (vacant / total) * 100;
  const maintenancePercentage = (maintenance / total) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Status Overview</h3>
      
      {/* Pie Chart Visual */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {/* Occupied segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#10B981"
              strokeWidth="20"
              strokeDasharray={`${occupiedPercentage * 2.51} 251.2`}
              strokeDashoffset="0"
            />
            {/* Vacant segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#3B82F6"
              strokeWidth="20"
              strokeDasharray={`${vacantPercentage * 2.51} 251.2`}
              strokeDashoffset={`-${occupiedPercentage * 2.51}`}
            />
            {/* Maintenance segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth="20"
              strokeDasharray={`${maintenancePercentage * 2.51} 251.2`}
              strokeDashoffset={`-${(occupiedPercentage + vacantPercentage) * 2.51}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-sm text-gray-600">Total Units</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend and Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{occupied}</span>
            <span className="text-xs text-gray-500">({occupiedPercentage.toFixed(1)}%)</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Vacant</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{vacant}</span>
            <span className="text-xs text-gray-500">({vacantPercentage.toFixed(1)}%)</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Maintenance</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{maintenance}</span>
            <span className="text-xs text-gray-500">({maintenancePercentage.toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        Last updated: {new Date().toLocaleDateString('en-IN', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        })}
      </div>
    </div>
  );
}