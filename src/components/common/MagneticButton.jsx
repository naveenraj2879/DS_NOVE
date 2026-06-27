import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const MagneticButton = ({ children, className = '', onClick, type = 'button', disabled = false }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Animate button offset towards cursor
      gsap.to(button, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onMouseLeave = () => {
      // Return button to original state
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      });
    };

    button.addEventListener('mousemove', onMouseMove);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mousemove', onMouseMove);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [disabled]);

  return (
    <button
      ref={buttonRef}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {children}
    </button>
  );
};
