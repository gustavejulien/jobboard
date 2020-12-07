import React, { useState, useEffect, useRef } from "react";
import "./css/style.css";

export default function Dropdown({
  options,
  name,
  id,
  label,
  prompt,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  function toggle(e) {
    setOpen(e && e.target === ref.current);
  }

  function filter(options) {
    return options[name].filter(
      (option) =>
        option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  function displayValue() {
    if (query.length > 0) return query;
    if (value) return value[label];
    return "";
  }

  function selectOption(option) {
    setQuery("");
    onChange(option);
    setOpen(false);
  }

  return (
    <div className='dropdown'>
      <div
        className='control'
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className='selected-value'>
          <input
            ref={ref}
            placeholder={value ? value[label] : prompt}
            type='text'
            value={displayValue()}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange(null);
            }}
            onClick={toggle}
            onTouchEnd={toggle}
          />
        </div>
        <div className={`arrow ${open ? "open" : null}`} />
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {filter(options).map((option) => (
          <div
            key={option[id]}
            className={`option ${ value === option ? "selected" : null }`}
            onClick={() => selectOption(option)}
            onTouchEnd={() => selectOption(option)}
          >
            {option[label]}
          </div>
        ))}
      </div>
    </div>
  );
}