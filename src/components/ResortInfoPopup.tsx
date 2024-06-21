// src/components/ResortInfoPopup.tsx

import React from 'react';
import { Resort } from '@/types/types';
import Image from 'next/image';

interface ResortInfoPopupProps {
  resort: Resort;
}

const ResortInfoPopup: React.FC<ResortInfoPopupProps> = ({ resort }) => {
  return (
    <div className='card lg:card-side bg-base-100 shadow-xl z-10'>
      <Image alt={resort.name} src="/ski-resort-placeholder.jpg" width={150} height={200}></Image>
      <div className='card-body'>
        <h2 className='card-title'>{resort.name}</h2>
        <p>{resort.description}</p>
        <p><strong>Location:</strong> {resort.location}</p>
        {resort.website && (
          <p><a href={resort.website} target="_blank" rel="noopener noreferrer">Website: {resort.website}</a></p>
        )}
      </div>
    </div>
  );
};

export default ResortInfoPopup;
