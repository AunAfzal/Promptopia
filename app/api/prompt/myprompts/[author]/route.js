import Prompt from '@/app/models/prompt';
import { connectToDB } from '@/utils/database';

export async function GET(req,{params}) {
    try {
        await connectToDB();

        const author = params.author;

        const prompts = await Prompt.find({author});

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
} 
