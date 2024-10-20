"use client";

import React from "react";
import PropertyCard from "@/app/components/PropertyCard";



interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  bedrooms: number;
  hasWifi?: boolean;
  quantity?: number;
  amenities: string[];
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {
      (properties && properties.length===0) ?
         <div className="w-full h-[400px] text-8xl font-bold text-gray-700">No Room Found</div>
       :
      properties.map((property:Property) => (
        // Pass the entire property object as a prop
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
