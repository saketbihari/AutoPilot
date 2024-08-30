import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import {Card, CardContent,CardHeader,CardActions, IconButton, Button, Checkbox, FormControlLabel,Typography  } from '@mui/material';

import DesignComponent from './DesignComponent';
import TestCaseComponent from './TestCaseComponent';
import CodeComponent from './CodeComponent';
import UnitTestComponent from './UnitTestComponent';

const Textarea = ({ ...props }) => (
  <textarea {...props} className="w-full p-2 border rounded" />
);
function App() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [geberateAll, setGenerateAll] = useState(false);
  const [instruction, setInstruction] = useState({
    design: true,
    testCase: true,
    code: false,
    unitTest: false,
    compile:false
  });
  const { design, testCase, code,unitTest,compile } = instruction;

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


  //const generateDesignRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { type: 'date', content: input };
    setChatHistory([newMessage, ...chatHistory]);
    //setInput('');

    setGenerateAll(true);
    // if (generateDesignRef.current) {
    //   generateDesignRef.current.loadDiagram();
    // }
  };
  const handleChange = (event) => {
    setInstruction({
      ...instruction,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left panel for chat history */}
      <div className="w-1/6 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Chat History</h2>
          {chatHistory.map((message, index) => (
            <Card key={index} className="mb-2">
              <CardContent>
                <p className={`text-sm ${message.type === 'user' ? 'text-blue-600' : 'text-green-600'}`}>
                  {message.type === 'date' ?  date : 'AI:'}
                </p>
                <p className="text-sm mt-1">{message.content}</p>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">SE Auto-Pilot</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your business use case and instructions here..."
            className="w-full p-2 mb-2"
            rows={4}
          />
          <div className="flex items-center space-x-4 mb-2">
            <FormControlLabel id="designCheckbox"  control={
              <Checkbox checked={design} onChange={handleChange} name="design" />} label="Generate Design" />
            <FormControlLabel id="testCasesCheckbox" control={
              <Checkbox checked={testCase} onChange={handleChange} name="testCase" />} label="Generate Test Cases" />
            <FormControlLabel id="codeCheckbox" control={
              <Checkbox checked={code} onChange={handleChange} name="code" />} label="Generate Code Implementation" />
            <FormControlLabel id="unitTestsCheckbox" control={
              <Checkbox checked={unitTest} onChange={handleChange} name="unitTest" />} label="Generate Unit Tests" />
            <FormControlLabel id="compileCheckbox" control={
              <Checkbox checked={compile} onChange={handleChange} name="compile" />} label="Compile" />
          </div>
          <Button variant="outlined" type="submit" className="w-full">
            Generate All
          </Button>
        </form>

        {/* Placeholder for generated content */}
        { geberateAll && design ? <DesignComponent/> : null }

        { geberateAll && testCase ? <TestCaseComponent/> : null }

        { geberateAll && code ? <CodeComponent/> : null }

        { geberateAll && unitTest ? <UnitTestComponent/> : null }
        
      </div>
    </div>
  );
}

export default App;
