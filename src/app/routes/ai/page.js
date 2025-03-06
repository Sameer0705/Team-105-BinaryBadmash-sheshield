"use client";

import React, { useState } from 'react';
import { generateContent } from '../../ai';

export default function Page() {

    const [aiResponse, setAiResponse] = useState('');
    const [prompt, setPrompt] = useState('give some preventive measures for preventing harrasment');


    
    const generateAiResponse = async () => {
        const response = await generateContent(prompt);
        setAiResponse(response);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            generateAiResponse();
        }
    }


    return (
        <div className='flex flex-col text-black items-center bg-white h-screen'>
            <h1 className='text-3xl font-bold'>Ai help</h1>
            <div className='w-[75%] m-auto'>
                {`${aiResponse}`}

            </div>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-[75%] p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter your prompt here"
            />
            <button
                onClick={generateAiResponse}
                className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
            >
                Generate Response
            </button>
        </div>
    )
}
