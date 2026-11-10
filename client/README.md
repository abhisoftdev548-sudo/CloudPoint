# CloudPoint Client

The CloudPoint client is the frontend application, built with
**Next.js** and the **App Router**.

The current structure organizes pages into route groups for
authentication, dashboard, and marketing. Route groups help organize
pages without adding their names to the URL.

## Folder structure

``` text
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

## Folder guide

  -----------------------------------------------------------------------
  Folder or file                      Purpose
  ----------------------------------- -----------------------------------
  `app/`                              App Router pages, layouts, and
                                      route groups.

  `app/(auth)/`                       Authentication-related pages such
                                      as login and signup.

  `app/(dashboard)/`                  Dashboard pages and their layouts.

  `app/(marketing)/`                  Public-facing marketing pages.

  `components/common/`                Shared components used in multiple
                                      parts of the client.

  `components/layout/`                Layout components such as
                                      navigation, headers, and sidebars.

  `components/ui/`                    Reusable interface components.

  `hooks/`                            Custom React hooks.

  `lib/`                              Shared libraries and supporting
                                      utilities.

  `public/`                           Static assets served directly by
                                      Next.js.

  `services/`                         Client-side API and
                                      external-service communication.

  `types/`                            Shared TypeScript types and
                                      interfaces.
  -----------------------------------------------------------------------

## Getting started

### Requirements

-   Node.js
-   npm

### Install dependencies

From the `client` directory:

``` bash
npm install
```

### Run in development mode

``` bash
npm run dev
```

Open the local URL printed in the terminal by Next.js.

### Build for production

``` bash
npm run build
```

### Run the production build

``` bash
npm run start
```

Use the scripts available in `package.json` if the commands above differ
from the current project configuration.

## Completed setup

-   **5 November 2026:** Client application created and running
    successfully as part of the initial repository setup.
-   **7 November 2026:** App Router, root layout, route groups, and
    frontend folder architecture configured.

## Development conventions

-   Keep route-specific pages and layouts inside `app/`.
-   Put reusable UI in the appropriate `components/` subfolder.
-   Keep API communication in `services/` rather than scattering request
    logic across components.
-   Put reusable React behavior in `hooks/`.
-   Share application types through `types/`.
-   Keep secrets out of client-side code. Any variable exposed to the
    browser must be treated as public.
