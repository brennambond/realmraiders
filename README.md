<div align="center">
  <br />
      <img src="/public/assets/icons/textLogo.svg" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS_14-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Stripe-black?style=for-the-badge&logoColor=white&logo=stripe&color=008CDD" alt="stripe" />
  </div>

  <h3 align="center">A Full Stack Next 14 Events App</h3>
</div>

## <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)
5. [Snippets](#snippets)
6. [Links](#links)
7. [More](#more)

## <a name="introduction">Introduction</a>

This application will allow you to join, create, and update event-like Raids built with Next.js 14 and full-stack features. With seamless payment processing via Stripe, both you and those looking to join your newly created Raid will be able to purchase tickets for any Raid they'd like with ease.

## <a name="tech-stack">Tech Stack</a>

- Node.js
- Next.js
- TypeScript
- TailwindCSS
- MongoDB
- Stripe

## <a name="features">Features</a>

**Raids:** Easily create, read, update, and delete Raids, giving the user full control over the management of their Raids and Raid tickets.

- **Create Raids:** Users can effortlessly create new Raids, adding in essential details such as its title, date, environment, and other information.
- **Read Raids:** Users can access a detailed view of all Raids, allowing them to explore all of its information, including descriptions, specific Raid ranks, and related Raids.
- **Update Raids:** Users can modify their created Raid's details easily, ensuring that their Raid's information remains accurate and up-to-date.
- **Delete Raids:** Users can remove Raidst they've created from the system, allowing them to manage their Raids efficiently.

**Related Raids:** Connects Raids that share the same category rank within our system and display these Raids on the individual Raid's details page.

**Organized Raids:** Showcase Raids organized by the user via their user profile page, with a clean structure and user-friendly display.

**Search & Filter Raids:** With our search and filter system, users can easily find Raids based on their title and category rank.

**Checkout and Payment with Stripe:** Using Stripe, checkout and payment for Raid tickets is seemless and secure.

**Raid Orders:** Via the user's profile page, they are provided an overview of Raid tickets they have purhcased, allowing them to navigate to those order pages with ease.

**Search Orders:** Orders can also be searched within their orders page to locate other orders that have been processed.

**Authentication with Clerk:** With user management via Clerk, authentication is both secure and efficient for all users.

## <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
#NEXT
NEXT_PUBLIC_SERVER_URL=

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#MONGODB
MONGODB_URI=

#UPLOADTHING
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

#STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Replace the placeholder values with your actual credentials

**Running the Project**

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="links">Links</a>

Link to deployed project: https://realmraiders.vercel.app/
