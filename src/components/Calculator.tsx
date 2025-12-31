import React, { useState } from 'react';

export interface CalculatorProps {
  className?: string;
}

export const Calculator: React.FC<CalculatorProps> = ({ className = '' }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setShouldResetDisplay(true);
  };

  const calculate = () => {
    if (!equation) return;
    
    const parts = equation.split(' ');
    const prev = parseFloat(parts[0]);
    const operator = parts[1];
    const current = parseFloat(display);
    
    let result = 0;
    switch (operator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/': result = prev / current; break;
      default: return;
    }
    
    setDisplay(String(result));
    setEquation('');
    setShouldResetDisplay(true);
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const buttons = [
    { label: 'AC', onClick: clear, className: 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300' },
    { label: '+/-', onClick: () => setDisplay(String(parseFloat(display) * -1)), className: 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300' },
    { label: '%', onClick: () => setDisplay(String(parseFloat(display) / 100)), className: 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300' },
    { label: '÷', onClick: () => handleOperator('/'), className: 'bg-orange-500 text-white hover:bg-orange-400' },
    { label: '7', onClick: () => handleNumber('7'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '8', onClick: () => handleNumber('8'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '9', onClick: () => handleNumber('9'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '×', onClick: () => handleOperator('*'), className: 'bg-orange-500 text-white hover:bg-orange-400' },
    { label: '4', onClick: () => handleNumber('4'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '5', onClick: () => handleNumber('5'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '6', onClick: () => handleNumber('6'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '−', onClick: () => handleOperator('-'), className: 'bg-orange-500 text-white hover:bg-orange-400' },
    { label: '1', onClick: () => handleNumber('1'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '2', onClick: () => handleNumber('2'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '3', onClick: () => handleNumber('3'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '+', onClick: () => handleOperator('+'), className: 'bg-orange-500 text-white hover:bg-orange-400' },
    { label: '0', onClick: () => handleNumber('0'), className: 'col-span-2 bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '.', onClick: () => handleNumber('.'), className: 'bg-zinc-800 text-white hover:bg-zinc-700' },
    { label: '=', onClick: calculate, className: 'bg-orange-500 text-white hover:bg-orange-400' },
  ];

  return (
    <div className={`flex flex-col h-full w-full bg-black text-white font-sans select-none ${className}`}>
      {/* Title Bar */}
      <div className="px-6 py-4 border-b border-zinc-900">
        <h1 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">Precision Calculator</h1>
      </div>

      {/* Display */}
      <div className="flex flex-col justify-end items-end px-6 py-8 h-48 bg-black">
        <div className="text-zinc-500 text-lg h-8 mb-2 truncate">{equation}</div>
        <div className="text-7xl font-light tracking-tight truncate w-full text-right leading-tight">{display}</div>
      </div>

      {/* Keypad */}
      <div className="flex-1 grid grid-cols-4 gap-[1px] bg-zinc-900 border-t border-zinc-900">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className={`
              flex items-center justify-center text-2xl transition-colors
              focus:outline-none active:brightness-125
              ${btn.className}
              rounded-none
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
