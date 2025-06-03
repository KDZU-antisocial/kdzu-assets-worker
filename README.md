# kdzu-assets-worker

This Cloudflare Worker serves static files from an R2 bucket. Here’s how it works:

- When a request comes in, it extracts the path from the URL and uses it as the key to look up an object in the R2 bucket bound as `ASSETS`.
- If the object exists, it sets the appropriate `Content-Type` header based on the file extension (`.svg`, `.js`, `.css`, or uses the metadata/default).
- It returns the file’s contents in the response.
- If the file is not found in the bucket, it returns a 404 response.

**In summary:**  
This worker acts as a simple static file server, delivering files stored in your R2 bucket.

## Deploying with a Github Action

This repo is deployed to Cloudflare when `dev` is merged into the `main` branch. The default branch is set to `dev`.

## Features

- Serves static assets (JS, CSS, SVG, etc.) from R2 storage
- Sets correct `Content-Type` headers for common file types
- Returns `404 Not Found` for missing files

## Usage

1. **Configure R2 Bucket:**  
   Ensure your R2 bucket (`kdzu-static`) contains the files you want to serve.

2. **Configure Wrangler:**  
   Edit `wrangler.toml` with your Cloudflare account details and R2 bucket binding.

3. **Deploy the Worker:**

   ```sh
   wrangler deploy --env production
   ```

4. **Access Your Assets:**  
   Visit `https://static.kdzu.org/<filename>` to access your files.

## Development

- Local preview:

  ```sh
  wrangler dev
  ```

- Build (if needed):
  ```sh
  npm run build
  ```

## File Structure

- `src/index.js` – Worker code for serving static files
- `wrangler.toml` – Cloudflare Worker and R2 configuration

## License

MIT
