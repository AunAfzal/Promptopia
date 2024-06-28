"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import Prompt from '../prompt/page';
import Link from "next/link";
export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = async () => {
        try {
          const response = await fetch('/api/prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchTerm: searchInput }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching prompts:', error);
          // Handle the error appropriately, e.g., display an error message to the user
        }
      };
      useEffect(() => {
          handleSearch();
      }, []); 
      
  
    return (
      <div className='w-full mx-auto'>
        <input
          className="border-none w-full mx-auto shadow-md p-2 rounded-md focus:border-transparent "
          type="text"
          placeholder="Search for a tag or prompt"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch(); 
          }}
        />
          <div>
            <br/>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {searchResults.map((prompt) => (
                  // Assuming you're using Next.js for routing
                  <Link href={`/prompt/${prompt._id}`} key={prompt._id} passHref className='block h-full bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden relative border border-gray-300 p-4 rounded-md'>
                      <Prompt
                          key={prompt._id}
                          id={prompt._id}
                          author={prompt.author}
                          authorEmail={prompt.authorEmail}
                          promptText={prompt.promptText}
                          tags={prompt.tags}
                      />
                  </Link>
                ))}
              </div>
            </div>
          </div>
      </div>
  )
}
