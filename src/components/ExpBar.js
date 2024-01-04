import React from 'react';
import { experienceForLevel, calculateLevel } from '../function/Level';

function BarreExperience({ experience }) {
  const calculateExpBarWidth = () => {
    const nextLevelExp = experienceForLevel(calculateLevel + 1);
    const currentLevelExp = experienceForLevel(calculateLevel);
    const progress = (experience - currentLevelExp) / (nextLevelExp - currentLevelExp);
    return `${Math.min(Math.max(progress * 100, 0), 100)}%`;
  };

  return (
    <div className='name-profil'>
      <p>{experience} exp</p>
      <div className='barreExperience'>
        <div className='currentExperience' style={{ width: calculateExpBarWidth() }}></div>
      </div>
    </div>
  );
}

export default BarreExperience;
