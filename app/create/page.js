'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState([]);
  const router = useRouter();

  const {user} = useUser();
  
  const addTag = (tag) => {
    setTags([...tags, tag]);
  };

  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  async function handlePost() {
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: user.name,
          authorEmail: user.email,
          promptText:prompt,
          tags
        }),
      });
      console.log(tags);
  
      if (!response.ok) {
        throw new Error('Failed to create prompt');
      }
  
      const data = await response.json();
      console.log('Prompt created successfully:', data);
  
      // Handle successful prompt creation (e.g., redirect, display success message)
      // You can use the returned data (data) as needed
    } catch (error) {
      console.error('Error creating prompt:', error);
      // Handle errors appropriately (e.g., display error message to the user)
    }
    router.push('/');
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-white">
      {user ? 
      <div className="max-w-md p-4 border border-gray-300 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Create Prompt</h2>

        <div className="mb-4">
          <label className="block mb-2">Prompt Text:</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tags:</label>
          <input
            type="text"
            placeholder="(Enter after tag name to add it)"
            className="w-full border border-gray-300 p-2 rounded-md"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const tag = e.target.value.trim();
                if (tag) {
                  addTag(tag);
                  e.target.value = '';
                }
              }
            }}
          />
          <div className="mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="tag inline-block bg-gray-200 px-2 py-1 text-sm text-gray-700 rounded-full mr-2 mb-2">
                {tag}
                <button
                  className="ml-1 text-red-500"
                  onClick={() => removeTag(index)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
      : <h1>You are not logged in</h1>}
    </div>
    
  );
}
