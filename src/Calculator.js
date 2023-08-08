import React, { useState } from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  pressed: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState(null);

  const handleNumberClick = (number) => {
    if (operator) {
      setInput(result + ' ' + operator + ' ' + (input.split(' ')[2] || '') + number);
    } else {
      setInput(input + number);
    }
  };

  const handleOperatorClick = (newOperator) => {
    if (input && !operator) {
      setResult(parseFloat(input));
      setInput('');
      setOperator(newOperator);
    }
  };

  const handleClearClick = () => {
    setInput('');
    setResult(0);
    setOperator(null);
  };

  const handleEqualsClick = () => {
    const operands = input.split(' ');
    if (operands.length >= 3) {
      const [left, _, right] = operands;
      let newResult = 0;

      switch (operator) {
        case '+':
          newResult = parseFloat(left) + parseFloat(right);
          break;
        case '-':
          newResult = parseFloat(left) - parseFloat(right);
          break;
        case '*':
          newResult = parseFloat(left) * parseFloat(right);
          break;
        case '/':
          newResult = parseFloat(left) / parseFloat(right);
          break;
        default:
          break;
      }

      setResult(newResult);
      setInput('');
      setOperator(null);
    }
  };

  const displayValue = input || result;

  return (
    <div className="calculator">

      <div className="display">
        {displayValue}
      </div>

      <div className="buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
          <motion.button
            key={number}
            onClick={() => handleNumberClick(number)}
            variants={buttonVariants}
            whileTap="pressed"
          >
            {number}
          </motion.button>
        ))}

        {['+', '-', '*', '/'].map(op => (
          <motion.button
            key={op}
            onClick={() => handleOperatorClick(op)}
            variants={buttonVariants}
            whileTap="pressed"
          >
            {op}
          </motion.button>
        ))}

        <motion.button onClick={handleClearClick} variants={buttonVariants} whileTap="pressed">Clear</motion.button>
        <motion.button onClick={handleEqualsClick} variants={buttonVariants} whileTap="pressed">=</motion.button>
      </div>
      
    </div>
  );
}

export default Calculator;



