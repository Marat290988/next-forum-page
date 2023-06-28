import React from 'react';
import styles from '@/components/ui/ReactIcon/ReactIcon.module.scss';
import { FC } from 'react';

const ReactIcon: FC<{className: string}> = ({className}) => {
  return (
    <div className={`${styles['react-icon']} ${className}`}>
      <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles['rotating']}>
        <circle cx="0" cy="0" r="2" fill="var(--blue01)"></circle>
        <g stroke="var(--blue01)" strokeWidth="1" fill="none">
          <ellipse rx="10" ry="4.5"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
      </svg>
    </div>
  )
}

export default ReactIcon