
import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  ariaLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, setEnabled, ariaLabel }) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${enabled ? 'bg-sky-500' : 'bg-gray-600'}`}
    >
      <span
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </button>
  );
};

export default ToggleSwitch;
