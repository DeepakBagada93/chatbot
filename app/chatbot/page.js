'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage = { text: data.reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage = { text: "I'm sorry, there was an error processing your request.", sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput('');
  };

  // Embed code generator
  const embedCode = `<iframe src="https://yourdomain.com/chatbot.html" width="400" height="600" style="border:none; position:fixed; bottom:20px; right:20px; z-index:9999;" title="Chatbot"></iframe>`;

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto p-4 bg-gray-100 border rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 bg-white rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-200 text-black text-right' : 'bg-gray-300 text-black text-left'}`}
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-lg text-black"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
      <div className="mt-4">
        <button
          className="p-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          onClick={() => setShowEmbedCode(!showEmbedCode)}
        >
          {showEmbedCode ? 'Hide Embed Code' : 'Show Embed Code'}
        </button>
        {showEmbedCode && (
          <div className="mt-2 p-2 border rounded-lg bg-gray-100">
            <h3 className="font-bold">Embed Code:</h3>
            <pre className="whitespace-pre-wrap text-black">{embedCode}</pre>
            <button 
              className="mt-2 p-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => navigator.clipboard.writeText(embedCode)}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
