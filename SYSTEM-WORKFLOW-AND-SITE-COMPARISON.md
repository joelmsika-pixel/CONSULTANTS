# CLM Consultants website: how it works

## Summary

This repository contains a Vue 3 website and a Laravel REST API. The browser renders the public site and sends requests to Laravel. Laravel validates input, applies authentication and permissions, and reads or writes records in MySQL.

The implementation follows the main technology and security direction in the supplied architecture proposal. It is **not yet verified to be the same site, content, or appearance as `consultants.co.tz`**: attempts to open both `https://consultants.co.tz` and `https://www.consultants.co.tz` failed because the domain could not be resolved from this environment.

The PDF is explicitly a proposed architecture, not a verified description of the live website. A failed DNS lookup is not enough to determine whether the live website is available elsewhere or what it contains. The live site's pages, branding, copy, and feature behavior therefore still need to be compared when the domain or screenshots/source content are accessible.

## Components and request flow

```text
Visitor / member / staff browser
        |
        | Vue 3 pages, Vue Router, Pinia, Tailwind CSS
        | same-origin /api/v1 and /sanctum requests
        v
Laravel API
        |
        | request validation, throttling, session authentication,
        | policies/permissions, controllers and audit records
        v
MySQL
        |
        +-- public content and FAQs
        +-- contact and consultation inquiries
        +-- users, roles and permissions
        +-- forum categories, topics, replies and reports
        +-- administrative audit log
```

In local development, Vite serves the frontend on port `5173` and proxies `/api` and `/sanctum` requests to Laravel on port `8000`. In production, the built frontend should be served over HTTPS by the web server; `/api` and `/sanctum` must reach Laravel.

### Public pages and content

The Vue router serves the home, about, services, news, contact, consultation, forum, sign-in and registration pages. The frontend fetches services, published news, FAQs, forum categories and published forum discussions from the versioned `/api/v1` API. Laravel returns published/active content only; drafts are not exposed through public read endpoints.

### Contact and consultation forms

1. A visitor submits a form from the Vue website.
2. Laravel enforces request throttling and server-side field validation; browser validation is only a usability aid.
3. Consultation requests must reference active services. The consultation and its service selections are saved together.
4. Contact and consultation submissions receive opaque reference IDs. The public response does not return the inquiry record.
5. Authorized staff can review the inquiries, change workflow status, and create an audit entry.

Email notifications are not yet connected. The staff workflow is available in the application, but notifications and retention policies still need configuration.

### Member authentication and forum

The site uses Laravel Sanctum's first-party cookie/session approach rather than putting long-lived credentials in browser local storage. State-changing requests first obtain a CSRF cookie. Laravel regenerates the session after login and registration and invalidates it on logout.

New accounts receive only the `registered_member` role. Members can submit topics and replies, but new posts remain pending until an authorized moderator publishes them. Signed-in members can report published topics. Moderators can review pending topics, replies and reports.

### Staff access

Laravel—not hidden frontend buttons—is responsible for access decisions:

- Administrators with the relevant permission can review contact/consultation inquiries.
- Content managers can create/update services, news articles and FAQs.
- Forum moderators can review and publish/hide posts and resolve reports.
- Sensitive staff changes write audit records. Audit metadata does not include credentials or inquiry message content.

An existing active account can be granted the administrator role from the backend terminal with the confirmation-protected `php artisan app:grant-administrator name@example.com` command.

## Comparison with the supplied architecture proposal

| Area | Proposal | Current implementation |
|---|---|---|
| Frontend | Vue 3, reusable components, router and shared state | Vue 3, Vue Router, Pinia, Tailwind CSS v4 |
| Backend/API | Laravel, versioned REST API, validation and authorization | Laravel `/api/v1` routes, Form Requests, throttling and server-side policies |
| Database | MySQL with relational business tables | MySQL migrations for content, inquiries, forum, roles/permissions and audit records |
| Public content | Services, news/articles, FAQs | Public read endpoints and website pages; staff editing is available |
| Inquiries | Contact/consultation intake, protected staff workflow | Validated, throttled submissions; protected status/review screens |
| Authentication | Sanctum cookie-based SPA sessions | Registration, login, current-user and logout use Sanctum and CSRF |
| Forum | Public reads, member posts, moderation and reports | Public reads, authenticated pending submissions, reports and staff moderation |
| Security | Least privilege, server-side authorization, safe errors and layered controls | Permission-backed server checks, input limits, CSRF/session controls, rate limits, API security headers and audit records |
| Operations | Queues, monitoring, encrypted backups, production HTTPS and tested recovery | Production guidance is documented; these infrastructure services are not configured by the local project |

## What is not complete or confirmed

- **Live-site parity:** not confirmed; the domain was not resolvable from this environment.
- **Approved company content and exact visual identity:** the current copy and visual treatment are starter content. Confirm approved wording, logo, colors, contact details, service names and page requirements before launch.
- **Password recovery and email verification:** not implemented.
- **Email notifications and background jobs for inquiries/forum activity:** not configured.
- **Private file uploads, malware scanning and authorized document delivery:** not implemented.
- **User/role administration screens:** roles and permissions exist, but staff cannot manage users and role assignments through a UI.
- **Production operations:** HTTPS hosting, production CSP/HSTS tuning, monitoring, encrypted backups and recovery drills require deployment configuration.
- **Privacy and retention:** confirm consent language, data-retention periods, privacy policy and local legal requirements before collecting real visitor information.

## Local checks and setup

The implementation was verified with 17 Laravel feature tests (61 assertions), a successful frontend production build, and Laravel Pint formatting checks. The additive database migrations and reference roles/forum category were applied to the configured local database; no destructive `migrate:fresh` was run.

Start the backend from `backend/`:

```powershell
php artisan serve
```

Start the frontend from `frontend/` in a second terminal:

```powershell
npm run dev
```

Before deploying, configure production database credentials, trusted Sanctum/CORS domains, HTTPS cookies, `APP_DEBUG=false`, mail delivery, backups and monitoring. Do not copy local environment secrets into documentation or source control.
