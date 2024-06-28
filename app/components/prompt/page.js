"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Copy from './copy.svg'
import ClipboardJS from 'clipboard';
import { useEffect, useRef } from 'react';

export default function Prompt({id, author, authorEmail, promptText, tags }) {
  let limitedPromptText = '';
  if (promptText && promptText.length > 10) {
      limitedPromptText = promptText.substring(0, promptText.indexOf(' ', 10));
  } else {
      // Handle the case where promptText is undefined, null, or shorter than 10 characters
      limitedPromptText = promptText;
  }

  const clipboardBtnRef = useRef(null);

  useEffect(() => {
    // Initialize ClipboardJS when the component mounts
    const clipboard = new ClipboardJS(clipboardBtnRef.current, {
      text: () => limitedPromptText,
    });

    // Cleanup the clipboard instance when the component unmounts
    return () => {
      clipboard.destroy();
    };
  }, [promptText]);

  return (
    <div >
        <div>
          <div className="font-bold">{author}</div>
          <div className="text-gray-500 break-all">{authorEmail}</div>
          <div>{limitedPromptText}..</div>
          <div className="mt-2 flex flex-wrap text-blue-500">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-100 p-2 rounded-md mr-2">
                {tag}
              </span>
            ))}
          </div>
        </div>

      <button
        ref={clipboardBtnRef}
        className="absolute top-0 right-0 p-2 cursor-pointer"
        onClick={(event) => event.preventDefault()}
      >
        <Image src={Copy} alt="Copy" width={20} height={20} />
      </button>
    </div>
  );
};