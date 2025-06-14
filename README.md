# Pinterest Image Scraper API

A serverless API that allows you to search for random Pinterest images without an API key. This project uses Cloudflare Workers to handle the scraping and can be deployed to GitHub Pages.

## Features

- Search for Pinterest images by keyword
- Get random images related to your search
- No API key required
- Fast and serverless
- CORS enabled

## Setup

1. **Fork this repository**
   Click the "Fork" button at the top right of this page to create your own copy.

2. **Set up Cloudflare Workers**
   - Sign up for a Cloudflare account at [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
   - Install Wrangler CLI: `npm install -g @cloudflare/wrangler`
   - Authenticate: `wrangler login`
   - In the repository directory, run: `wrangler whoami` to verify your authentication
   - Update `wrangler.toml` with your Cloudflare account ID

3. **Deploy to Cloudflare Workers**
   ```bash
   wrangler publish
   ```

4. **Set up GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Select the `main` branch and `/docs` folder
   - Save the settings

## Usage

### API Endpoint

```
GET /api/search?q=your-search-query
```

### Example Request

```bash
curl "https://your-worker.your-username.workers.dev/api/search?q=nature"
```

### Example Response

```json
{
  "success": true,
  "data": [
    {
      "title": "Beautiful Nature",
      "description": "Amazing nature landscape",
      "imageUrl": "https://i.pinimg.com/originals/..."
    },
    ...
  ]
}
```

## Rate Limiting

This API is rate limited to prevent abuse. Please use it responsibly.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
