# CloudPoint Server

The CloudPoint server is the backend application. It handles API
requests, application logic, and database access.

The backend uses **Node.js**, **Express**, **TypeScript**, and
**MongoDB** through **Mongoose**.

## Folder structure

``` text
server/
├── src/
│   ├── configs/
│   │   ├── dbConfig.ts
│   │   └── envConfig.ts
│   ├── constants/
│   │   ├── httpStatus.ts
│   │   └── messages.ts
│   ├── controllers/
│   ├── middlewares/
│   │   └── errorHandler.ts
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   │   ├── ApiResponse.ts
│   │   ├── AppError.ts
│   │   ├── AsyncHandler.ts
│   │   └── logger.ts
│   ├── app.ts
│   └── index.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

## Folder guide

  -----------------------------------------------------------------------
  Folder or file                      Purpose
  ----------------------------------- -----------------------------------
  `configs/`                          Application configuration,
                                      including environment and database
                                      setup.

  `constants/`                        Shared fixed values such as HTTP
                                      status codes and common messages.

  `controllers/`                      Handles incoming requests and sends
                                      responses.

  `middlewares/`                      Express middleware, including
                                      centralized error handling.

  `models/`                           Mongoose models and database
                                      schemas.

  `routes/`                           API route definitions.

  `services/`                         Business logic and integrations.

  `utils/`                            Reusable helpers and classes such
                                      as `ApiResponse`, `AppError`,
                                      `AsyncHandler`, and the logger.

  `app.ts`                            Express application setup,
                                      middleware registration, and route
                                      mounting.

  `index.ts`                          Server entry point and application
                                      startup.
  -----------------------------------------------------------------------

## Getting started

### Requirements

-   Node.js
-   npm
-   A reachable MongoDB instance

### Install dependencies

From the `server` directory:

``` bash
npm install
```

### Configure environment variables

1.  Use `.env.example` as a reference to create a file named `.env`.
2.  Add the values required by the environment configuration.
3.  Make sure `.env` is excluded from Git.

Do not put real passwords, database credentials, API keys, or other
secrets in `.env.example`. Keep only variable names and safe example
values there.

### Run in development mode

``` bash
npm run dev
```

Use the scripts defined in `package.json` if the development command
differs.

## Implemented backend foundation

### Database connection

-   Connected MongoDB to the server through the database configuration.
-   Kept database configuration separate from the main application
    setup.

### Environment configuration

-   Added server-side `.env` and `.env.example`.
-   Added an environment configuration module to centralize environment
    variable handling.

### Error handling

-   Added a custom `AppError` class for application errors.
-   Added `AsyncHandler` to forward rejected asynchronous controller
    operations to Express error handling.
-   Added centralized error-handling middleware.

### API responses

-   Added an `ApiResponse` utility to keep successful API responses
    consistent.
-   Centralized common response messages in `constants/messages.ts`.
-   Centralized HTTP status codes in `constants/httpStatus.ts`.

### Logging

-   Added a reusable logger utility for application logging.

## Error-handling flow

``` text
Incoming request
      |
      v
Controller wrapped with AsyncHandler
      |
      +---- successful operation ----> API response
      |
      +---- rejected promise --------> next(error)
                                           |
                                           v
                                  Error-handling middleware
                                           |
                                           v
                                  Consistent error response
```

## Development conventions

-   Validate and centralize environment variables in the configuration
    layer.
-   Never commit `.env` or expose secrets in API responses or logs.
-   Use `AppError` for expected application errors.
-   Use `AsyncHandler` for asynchronous route handlers.
-   Use the centralized error middleware for consistent error responses.
-   Use `ApiResponse` for successful API responses.
-   Use `HTTP_STATUS` and `MESSAGES` constants instead of repeating
    values.
-   Keep business logic separate from route definitions.
