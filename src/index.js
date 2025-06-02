export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		// Remove leading slash for R2 key
		const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
		const object = await env.ASSETS.get(key);
		if (object) {
			let contentType = object.httpMetadata?.contentType || 'application/octet-stream';
			if (key.endsWith('.svg')) contentType = 'image/svg+xml';
			if (key.endsWith('.js')) contentType = 'application/javascript';
			if (key.endsWith('.css')) contentType = 'text/css';
			return new Response(object.body, {
				headers: { 'content-type': contentType },
			});
		}
		return new Response('Not found', { status: 404 });
	},
};
