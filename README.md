# Okta Auth Demo

A tutorial project demonstrating Okta OIDC / OAuth2 authentication across multiple backend stacks with a shared React frontend.

## What it does

Users log in through Okta via the React UI. On successful authentication, an Okta-issued JWT access token is stored client-side and sent as a Bearer token on requests to protected API endpoints. Each backend validates the token against the Okta authorization server and returns the authenticated user's profile claims.

## Project structure

```
okta-demo/
├── ui-okta-demo/          # React + TypeScript + Vite (Okta React SDK)
├── spring-boot/
│   └── api-okta-demo-service/  # Spring Boot 3 – OAuth2 resource server (port 8080)
├── dotnet/
│   └── api-okta-demo/     # .NET 10 Web API – JWT Bearer auth
└── guide/
    └── react-dotnet-okta-tutorial.html  # Step-by-step written guide
```

## API endpoints

| Method | Path | Access |
|--------|------|--------|
| GET | `/api/profile/public` | Public |
| GET | `/api/profile/me` | Protected – returns `name` and `email` from JWT claims |

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, `@okta/okta-react` |
| Backend (Spring) | Spring Boot 3, Spring Security OAuth2 Resource Server |
| Backend (.NET) | .NET 10, `Microsoft.AspNetCore.Authentication.JwtBearer` |
| Auth provider | Okta (OIDC / OAuth2) |

## Prerequisites

- An Okta developer account with an OIDC app and API authorization server configured
- Node.js + npm (frontend)
- JDK 21+ and Maven (Spring Boot)
- .NET 10 SDK (.NET API)

## Running locally

### Frontend — `ui-okta-demo/`

```bash
npm install
npm run dev        # http://localhost:5173
```

Configure `src/oktaConfig.ts` and `.env` with your Okta domain and client ID.

### Spring Boot API — `spring-boot/api-okta-demo-service/`

Set the `issuer-uri` environment variable before starting:

```bash
export SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=https://<your-okta-domain>/oauth2/default
./mvnw spring-boot:run   # http://localhost:8080
```

### .NET API — `dotnet/api-okta-demo/`

Set `Okta:Issuer` and `Okta:Audience` in `appsettings.json` or via environment variables, then:

```bash
dotnet run --project src/api-okta-demo.csproj
```
