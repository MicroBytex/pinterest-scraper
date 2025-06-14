addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/search') {
    return handleSearch(request);
  }

  // Serve static files from the public directory
  return fetch(request);
}

async function handleSearch(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (!query) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing search query parameter "q"' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // First, get the search results page
    const searchUrl = `https://pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?q=${encodeURIComponent(query)}&data={"options":{"query":"${encodeURIComponent(query)}","scope":"pins"}}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://pinterest.com/',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const pins = data.resource_response.data.results || [];

    // Extract relevant information from pins
    const results = pins.map(pin => ({
      title: pin.title || '',
      description: pin.description || '',
      imageUrl: pin.images?.orig?.url || pin.images?.orig?.url || ''
    })).filter(item => item.imageUrl);

    // Return the results as JSON
    return new Response(
      JSON.stringify({ success: true, data: results }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 's-maxage=3600, max-age=0' // Cache for 1 hour
        } 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to fetch Pinterest data',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}
