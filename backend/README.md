
## How to Run This Project
### BACKEND
#### Prerequisites
Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PNPM](https://pnpm.io/installation) (recommended package manager)
- [PostgreSQL](https://www.postgresql.org/download/) (locally or via Docker)
- [Git](https://git-scm.com/) (for cloning the repo)

> 💡 This project uses **Prisma** as the ORM and **TypeScript** with **Express**.

##### Step 1: Install Dependencies
Clone the repository and install dependencies using PNPM:

```bash
git clone <your-repo-url>
cd backend
pnpm install
```

##### Step 2: Set Up PostgreSQL
Create a new postgresql database locally or on the cloud:

##### Step 3: Configure Environment Variables 
create a .env file with the following variables
```bash
DATABASE_URL="link-to-your-db"
JWT_PASSPHRASE="your-secret-key"
```

##### Step 4: Push Prisma Schema to Database 
```bash
pnpm dlx prisma db push
```
 - Reads your prisma/schema.prisma file
 - Creates the tables and relationships in your database
 - Is safe to use during development
##### Step 5: Run the Development Server  
```bash
pnpm dev
```
> The server will start at: http://localhost:3000
> It uses ts-node and nodemon for hot reloading during development.