import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, Circle } from 'lucide-react';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoProps {
  className?: string;
  title?: string;
}

export const Todo: React.FC<TodoProps> = ({ 
  className = '', 
  title = 'Focus List' 
}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo: TodoItem = {
      id: Math.random().toString(36).substring(2, 9),
      text: inputValue.trim(),
      completed: false,
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`flex flex-col h-full w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 ${className}`}>
      {/* Header */}
      <div className="px-8 pt-12 pb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-light tracking-tight text-white mb-2"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-sm uppercase tracking-widest font-medium"
        >
          <span className="text-white">{todos.filter(t => !t.completed).length}</span> tasks remaining
          <span className="mx-2 text-zinc-800">|</span>
          <span className="text-indigo-400">{todos.filter(t => t.completed).length}</span> completed
        </motion.p>
      </div>

      {/* Input */}
      <div className="px-8 mb-8">
        <form onSubmit={addTodo} className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a task..."
            className="w-full bg-zinc-900/50 border border-zinc-800 py-4 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
          />
          <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
        </form>
      </div>

      {/* List */}
      <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        <div className="max-w-full space-y-1">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`
                  group flex items-center gap-4 p-4 transition-colors
                  ${todo.completed ? 'opacity-50' : 'opacity-100'}
                `}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="relative flex items-center justify-center w-6 h-6 focus:outline-none"
                >
                  <motion.div
                    animate={{ 
                      scale: todo.completed ? [1, 1.2, 1] : 1,
                    }}
                    className={`
                      w-5 h-5 border transition-colors
                      ${todo.completed ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-700 hover:border-zinc-500'}
                    `}
                  >
                    {todo.completed && <Check className="w-full h-full text-white p-0.5" />}
                  </motion.div>
                </button>

                <span 
                  className={`flex-1 text-lg font-light transition-all duration-300 ${todo.completed ? 'line-through text-zinc-600 translate-x-1' : 'text-zinc-200'}`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {todos.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-zinc-600 italic font-light"
            >
              Nothing to do. Enjoy your day.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
