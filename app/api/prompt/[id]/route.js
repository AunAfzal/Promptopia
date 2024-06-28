import Prompt from '@/app/models/prompt';
import { connectToDB } from '@/utils/database';
// GET function to fetch a specific prompt
export async function GET(req,{params}) {
  try {
    await connectToDB();

    const id  = params.id; // Get the prompt ID from the query parameter
    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return Response.json({ status: 404, error: 'Prompt not found' });
    }

    return Response.json(prompt, { status: 200 });
  } catch (error) {
    return Response.json({ status: 500, error: 'Failed to fetch prompt' });
  }
}

// PATCH function to update a specific prompt
export async function PATCH(req, {params}) {
  try {
    await connectToDB();

    const  id  = params.id; // Get the prompt ID from the query parameter
    const { author, authorEmail, promptText, tags } = await req.json(); // Get data to update

    const prompt = await Prompt.findByIdAndUpdate(id, {
      author,
      authorEmail,
      promptText,
      tags,
    }, { new: true }); // Find and update, returning the updated prompt

    if (!prompt) {
      return NextResponse.json({ status: 404, error: 'Prompt not found' });
    }

    return Response.json(prompt, { status: 200 });
  } catch (error) {
    return Response.json({ status: 500, error: 'Failed to update prompt' });
  }
}

// DELETE function to delete a specific prompt
export async function DELETE(req, {params}) {
  try {
    await connectToDB();

    const id = params.id; // Get the prompt ID from the query parameter
    const prompt = await Prompt.findByIdAndDelete(id);

    if (!prompt) {
      return Response.json({ status: 404, error: 'Prompt not found' });
    }

    return Response.json({ status: 204 }); // No content
  } catch (error) {
    return Response.json({ status: 500, error: 'Failed to delete prompt' });
  }
}
