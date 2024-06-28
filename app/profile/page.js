'use client';
import { useEffect, useState } from 'react';
import React from 'react'
import Prompt from '../components/prompt/page'
import { useUser } from "@auth0/nextjs-auth0/client";


export default function MyProfile() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state

  const {user} = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/prompt/myprompts/${user.name}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error appropriately
      } finally {
        setIsLoading(false); // Set loading to false after fetching (success or error)
      }
    };

    fetchData();
  }, []);
   
  return (
    <div className="min-h-screen bg-gray-100">
      {user?
      <div className="p-4">
        <br/>
        <br/>
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        {isLoading ? (
        <p>Loading prompts...</p>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mx-auto">
          {data.slice(0, 6).map((prompt) => (
            <Prompt
              key={prompt._id}
              id={prompt._id}
              author={prompt.author}
              authorEmail={prompt.authorEmail}
              promptText={prompt.promptText}
              tags={prompt.tags}
            />
          ))}
        </div>
      ) : (
        <p>No prompts available.</p>
      )}
      </div>
      : <h1>You are not logged in</h1>}
    </div>
  )
}
