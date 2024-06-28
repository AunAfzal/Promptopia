import Prompt from '@/app/models/prompt';
import { connectToDB } from '@/utils/database';

export async function POST(req) {
    try {
      await connectToDB();
  
      const {searchTerm} = await req.json();

  
      let query = {};
  
      if (searchTerm === null || searchTerm.trim() === "") {
        // If searchTerm is null or empty, fetch all prompts
        console.log('All prompts coming');
      } else {
        query = {
            $and: [
                { _id: { $ne: null } }, // Exclude documents with null _id (optional)
                {
                $or: [
                    { author: { $regex: searchTerm, $options: 'i' } },
                    { authorEmail: { $regex: searchTerm, $options: 'i' } },
                    { promptText: { $regex: searchTerm, $options: 'i' } },
                    { tags: { $in: [searchTerm] } } // Case-sensitive search for tags
                ]
                }
            ]
            };
      }
  
      const prompts = await Prompt.find(query);
  
      return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      return new Response("Failed to fetch prompts", { status: 500 });
    }
  }
  
  /*
  try {
            await connectToDB();
    
            const prompts = await Prompt.find({});
    
            return new Response(JSON.stringify(prompts), { status: 200 });
        } catch (error) {
            return new Response("Failed to fetch all prompts", { status: 500 });
        }
    } */