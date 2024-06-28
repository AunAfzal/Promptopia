'use client';
import React, { useState, useRef, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { useUser } from "@auth0/nextjs-auth0/client";
import { Prompt } from 'next/font/google';

export default function Page({ params }) {
  const id = params.id;

  const[isSignedIn, setIsSignedIn]= useState(false);
  const[isAuthorzied, setIsAuthorized]= useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [prompt, setPrompt] = useState(null);
  const [editedPromptText, setEditedPromptText] = useState(prompt?.promptText || '');
  const [editedTags, setEditedTags] = useState(prompt?.tags || []);

  const clipboardButtonRef = useRef(null);

  const {user} = useUser();

  useEffect(() => {
    setIsSignedIn(user)
    //check if the prompt is users
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prompt');
        }

        const data = await response.json();
        setEditedTags(data.tags || []);
        setEditedPromptText(data.promptText || '');
        setPrompt(data);
        //console.log(data.authorEmail);

        //authorization
        if(data.authorEmail===user.email){
          setIsAuthorized(true);
        }

      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
    };

    fetchPrompt();
  }, [id]);

  useEffect(() => {
    if (clipboardButtonRef.current) {
      new ClipboardJS(clipboardButtonRef.current);
    }
  }, []);

  const handleCopyToClipboard = () => {
    if (clipboardButtonRef.current) {
      clipboardButtonRef.current.click();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete prompt');
      }

      // Handle successful deletion (e.g., redirect to homepage)
      console.log('Prompt deleted successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting prompt:', error);
    }
  };

  const handleSaveEdit = async () => {
    const updatedPrompt = {
      promptText: editedPromptText,
      tags: editedTags,
    };

    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPrompt),
      });

      if (!response.ok) {
        throw new Error('Failed to save edited prompt');
      }

      // Handle successful update (e.g., display success message)
      console.log('Prompt updated successfully');
      setIsEditing(false); // Exit editing mode

      // Re-fetch the updated prompt data
      const updatedData = await response.json();
      setPrompt(updatedData);

      // Update local state with the fetched data (optional)
      setEditedPromptText(updatedData.promptText);
      setEditedTags(updatedData.tags);
    } catch (error) {
      console.error('Error saving edited prompt:', error);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '' && !editedTags.includes(newTag)) {
      setEditedTags([...editedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditedTags(editedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        {prompt ? (
            <div className="border border-2 border-black-500 p-6 mb-6 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            <div>
                <div className="font-bold mb-1">{prompt.author}</div>
                <div className="text-gray-600">{prompt.authorEmail}</div>
                {isEditing ? (
                <>
                    <textarea
                    className="border p-2 w-full mb-2"
                    value={editedPromptText}
                    onChange={(e) => setEditedPromptText(e.target.value)}
                    ></textarea>
                    <div className="flex flex-wrap">
                    {editedTags.map((tag, index) => (
                        <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 text-sm text-gray-700 rounded-full mr-2 mb-2"
                        >
                        {tag}
                        <button
                            className="ml-1 text-red-500"
                            onClick={() => handleRemoveTag(tag)}
                        >
                            x
                        </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add Tag"
                        className="border p-2 ml-2"
                    />
                    <button
                        className="ml-2 bg-blue-500 text-white px-2 py-1/2 rounded-full"
                        onClick={handleAddTag}
                    >
                        Add
                    </button>
                    <br />
                    </div>
                </>
                ) : (
                <div className="mb-2">{editedPromptText || prompt.promptText}</div>
                )}
                <div className="flex flex-wrap">
                {editedTags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 text-sm text-gray-700 rounded-full mr-2 mb-2">
                    {tag}
                    </span>
                ))}
                </div>
            </div>
            {isEditing && (
                <button className="bg-blue-500 rounded-full px-2 py-1 text-white m-2" onClick={handleSaveEdit}>
                Save Edit
                </button>
            )}
            <button
                ref={clipboardButtonRef}
                className="hidden"
                data-clipboard-text={prompt.promptText || ''}
            ></button>
            
            {/* Footer Section */}
            <div className="mt-auto flex justify-between">
                <div>
                <button
                    className="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300 active:bg-blue-200"
                    onClick={handleCopyToClipboard}
                >
                    Copy
                </button>
                </div>
                {isAuthorzied && (
                <div className="flex items-center space-x-2">
                    <button className="text-blue-500" onClick={handleEditClick}>
                    Edit
                    </button>
                    <button className="text-red-500" onClick={handleDeleteClick}>
                    Delete
                    </button>
                </div>
                )}
            </div>
            </div>
        ) : (
            <h1>Prompt not found</h1>
        )}
        </div>

  );
}
