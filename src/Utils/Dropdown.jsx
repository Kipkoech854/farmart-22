import React, { useState } from 'react';
import '../Stylesheets/Dropdown.css';

 export const Dropdown = ({ label, options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
        {selected} <span>▼</span>
      </button>
      {open && (
        <ul className="dropdown-menu">
          {options.map((option, idx) => (
            <li key={idx} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


