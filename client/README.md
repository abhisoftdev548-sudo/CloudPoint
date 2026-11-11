# CloudPoint Client

The CloudPoint client is the frontend application, built with **Next.js** and the **App Router**.

The application uses route groups to organize authentication, dashboard, and marketing pages without adding group names to the URL.

## Folder Structure

```text
client/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
├── hooks/
├── lib/
├── public/
├── services/
├── types/
├── package.json
└── tsconfig.json
```

## Folder Guide

| Folder / File | Purpose |
|---|---|
| `app/` | App Router pages, layouts, and route groups. |
| `app/(auth)/` | Authentication-related pages such as login and signup. |
| `app/(dashboard)/` | Dashboard pages and their layouts. |
| `app/(marketing)/` | Public-facing marketing pages. |
| `components/common/` | Shared components used across the application. |
| `components/layout/` | Navigation, headers, sidebars, and layout components. |
| `components/ui/` | Reusable interface components. |
| `hooks/` | Custom React hooks. |
| `lib/` | Shared libraries and supporting utilities. |
| `public/` | Static assets served directly by Next.js. |
| `services/` | Client-side API and external-service communication. |
| `types/` | Shared TypeScript types and interfaces. |

## Tech Stack

- **Next.js** – React framework with App Router.
- **React** – Component-based UI development.
- **TypeScript** – Type safety and maintainability.
- **Tailwind CSS** – Utility-first styling.
- **shadcn/ui** – Reusable and customizable UI components.
- **Motion** – Declarative animations and transitions.
- **GSAP** – Advanced animations and scroll-based interactions.

## Getting Started

### Requirements

- Node.js
- npm

### Install Dependencies

From the `client` directory:

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

Open the local URL printed in the terminal by Next.js.

### Build for Production

```bash
npm run build
```

### Run the Production Build

```bash
npm run start
```

Use the scripts available in `package.json` if the commands above differ from the current project configuration.

## Development Progress

- **Client Setup:** Created and configured the Next.js client application.
- **App Router:** Configured the root layout and route groups for authentication, dashboard, and marketing.
- **Frontend Architecture:** Established a modular folder structure for components, hooks, services, utilities, and types.
- **Landing Page:** Created the initial CloudPoint marketing landing page.
- **UI Components:** Configured shadcn/ui for reusable and customizable interface components.
- **Animations:** Integrated Motion and GSAP for modern UI animations and interactions.
- **Performance Optimization:** Pending. The landing page requires further performance optimization.

## Development Conventions

- Keep route-specific pages and layouts inside `app/`.
- Put reusable UI in the appropriate `components/` subfolder.
- Keep API communication in `services/` rather than scattering request logic across components.
- Put reusable React behavior in `hooks/`.
- Share application types through `types/`.
- Keep shared utilities and configurations inside `lib/`.
- Keep styling consistent and maintainable.
- Use Motion and GSAP where animations improve the user experience.
- Avoid unnecessary client-side JavaScript and optimize component rendering.
- Keep secrets out of client-side code. Any variable exposed to the browser must be treated as public.
- Follow performance and accessibility best practices.