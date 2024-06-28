import Prompt from '@/app/models/prompt';
import { connectToDB } from '@/utils/database';

export async function POST(req) {

  const { author, authorEmail, promptText, tags } = await req.json();

  // Validate POST request body data  const { author, authorEmail, promptText, tags } = req.body;
  const validationErrors = []; // Array to store validation errors

  // Validate author (required, non-empty string)
  if (!author || typeof author !== 'string' || author.trim() === '') {
    validationErrors.push({ field: 'author', message: 'Author is required and must be a non-empty string' });
  }

  // Validate authorEmail (required, valid email format)
  if (!authorEmail || !/.+@.+\..+/.test(authorEmail)) {
    validationErrors.push({ field: 'authorEmail', message: 'Invalid email format' });
  }

  // Validate promptText (required, non-empty string)
  if (!promptText || typeof promptText !== 'string' || promptText.trim() === '') {
    validationErrors.push({ field: 'promptText', message: 'Prompt text is required and must be a non-empty string' });
  }

  // Validate tags (optional, array of strings)
  if (!Array.isArray(tags)) {
    validationErrors.push({ field: 'tags', message: 'Tags must be an array of strings' });
  }

  // Send validation errors back if any
  if (validationErrors.length > 0) {
    return Response.json({ status:400,errors: validationErrors }); // Correct usage
  }

  // Connect to the database
  try {
    await connectToDB();
  

    // Create a new Prompt object
    const newPrompt = new Prompt({ author, authorEmail, promptText, tags });

    // Save the new prompt to the database
    const savedPrompt = await newPrompt.save();

    // Send successful response with the created prompt
    return Response.json({staus:201},savedPrompt); // Correct usage
  } catch (error) {
    console.error('Error creating prompt:', error);
    return Response.json({status:500, error: 'Internal server error' }); // Correct usage
  }
}
