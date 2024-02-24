import React, { useState, useEffect } from "react";

const TypingEffect = ({ text,delay, color }) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      
      const timer = setTimeout(() => {
        if (index < text.length) {
          setDisplayText((prevText) => prevText + text[index]);
          setIndex((prevIndex) => prevIndex + 1);
        }
      }, delay);
  
      return () => clearTimeout(timer);
    }, [index, text, delay]);
  
   return <span style={{ color,  fontWeight: "bold"  }}>{displayText}</span>
  };
  
export default TypingEffect;