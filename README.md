![Spill Social Media Banner](/.github/spill-banner.png)

# Spill: Social Media Application
Spill is a modern open-source social media platform built for developers to share ideas, projects, and programming insights in a clean and minimal interface.

## Get started
To use this application you will either need to run the project locally or access the [production link](). If you want to run it on your own machine, start by downloading the project and installing the dependencies:

> [NodeJS](https://nodejs.org/en) must be installed on your machine.

```
npm install
```

Then, you'll need to set up your [Github OAuth API Credentials](https://github.com/settings/applications/new) inside a .env file.

> You can read more about it in: [Authorizing OAuth apps - GitHub Docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)

> You can see an example of how to setup your environment variables in [.env.example](/.env.example)

```
# Your .env file will look like this

DATABASE_URL="file:./database.db"

GITHUB_CLIENT_ID="YOUR_GITHUB_OAUTH_CLIENT_ID"
GITHUB_CLIENT_SECRET="YOUR_GITHUB_OAUTH_CLIENT_SECRET"

# The Next auth secret can be any text

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="RANDOM_TEXT"
```

After these steps, you will need to run the migrations:

```
npx prisma migrate dev
```

Now, you can finally run the application:

```
npm run dev
```

## Technologies & Tools
- ReactJS
- NextJS
- Styled Components
- TypeScript
- Prisma
- React Query
- React Markdown
- Zustand
- Zod
- Next API Routes
- OAuth
- Axios

<br />

## More about
[Production]() | [License](/LICENSE)
