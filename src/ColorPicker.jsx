import { useState } from "react";
import "./colorpicker.css";

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [copyMessage, setCopyMessage] = useState(null);

  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
  ];

  const colorText = document.querySelector("color-code");

  function handleClick(color) {
    // Gives color name
    setCopyMessage("Copied to clipboard!");
    setSelectedColor(color);
    navigator.clipboard.writeText(color.hex);
    // stylings

    setTimeout(() => setCopyMessage(null), 1000);
    colorText.textContent(color.name);
  }

  function handleMouseEnter(hex) {
    // Set something as this hex
    // Set display as hex when hover
    setSelectedColor({ hex: hex, name: null });
  }

  function handleMouseLeave() {
    // Remove hex when not hovered
    setSelectedColor({ hex: null, name: null });
    colorText.textContent("");
  }

  function handleFocus(index) {
    setFocusedIndex(index);

    // Make border appear around box and enlarge
    // Change background or something
  }

  function handleBlur() {
    // Remove border appear around box and enlarge
    setFocusedIndex(null);
  }

  function handleKeyDown(e, index) {
    // 1, 2, 3, 4, 5 focus
  }

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      <div className="color-list">
        {colors.map((color, index) => (
          <div className="color-item-container">
            <div
              key={index + 1}
              // Edit css based on JS
              className={`color-item ${focusedIndex === index ? "focused" : ""}`}
              style={{ backgroundColor: color.hex, "--glow-color": color.hex }}
              onClick={() => handleClick(color)}
              onMouseEnter={() => handleMouseEnter(color.hex)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
            >
              {/* 
            If selected color's hex matches then we display name or hex
            This will be what we tinker in our functions
            */}
              {selectedColor.hex === color.hex && (
                <span className="color-code">
                  {copyMessage || selectedColor.name || color.hex}
                </span>
              )}
            </div>
            <h2>{index + 1}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
