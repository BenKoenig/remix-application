// app/routes/api/articles.tsx

import { LoaderFunction } from '@remix-run/node';
import axios from 'axios';

export const loader: LoaderFunction = async ({ request }) => {
  const limit = 100;

  try { 
    const response = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles`, {
      params: {
        limit,
        sort: 'published_at'
      },
    });


    return new Response(JSON.stringify({ articles: response.data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch articles' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};  