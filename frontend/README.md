# CLM Consultants website

Vue 3 SPA built with Vite, Vue Router, Pinia, and Tailwind CSS v4. Public content, inquiries, forum discussions, and staff content/moderation screens use Laravel's `/api/v1` API. Authentication uses Sanctum's first-party session cookies; no long-lived credentials are stored in browser local storage.

## Development

Start Laravel from `backend/`:

```sh
php artisan serve
```

In another terminal, start Vue from `frontend/`:

```sh
npm install
npm run dev
```

Vite proxies `/api` and `/sanctum` to `http://127.0.0.1:8000`. Configure Laravel's `FRONTEND_URL` and `SANCTUM_STATEFUL_DOMAINS` for the frontend origin. Seed the backend with `php artisan migrate --seed`.

## Production build

```sh
npm run build
npm run preview
```

Serve `dist/` behind the production HTTPS web server, fall back to `index.html` for SPA routes, and route `/api` and `/sanctum` to Laravel. Replace the starter company copy and publish approved services/content before launch.

## Photography and brand assets

The header logo and several photographs are bundled locally from the public CLM Consultants website. Other illustrative stock photographs are not portraits of CLM staff or images of CLM offices. They are served from `src/assets/`:

- [CLM Consultants logo](https://clmconsultants.co.tz/wp-content/uploads/2022/09/clm-consultants-logo-1.png)
- [CLM Consultants website photography](https://clmconsultants.co.tz/)
- [Team collaboration photo](https://images.unsplash.com/photo-1521737711867-e3b97375f902)
- [Workshop photo](https://images.unsplash.com/photo-1556761175-b413da4baf72)
- [Workspace photo](https://images.unsplash.com/photo-1524758631624-e2822e304c36)

Replace illustrative stock photos with approved CLM photography as it becomes available. Confirm that use of third-party site assets and Unsplash imagery is permitted for the intended deployment.
