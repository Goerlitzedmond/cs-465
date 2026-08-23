# CS 465 Full Stack Development I

## Travlr Getaways — Full Stack Web Application

**Goerlitz Edmond | Southern New Hampshire University | CS 465**

---

## Architecture

### Compare and Contrast Frontend Development

This project used three distinct approaches to frontend development, each serving a different purpose in the application.

The first was **Express HTML with static files**, used in Module 1 to serve raw HTML pages directly from the file system. Every page was a separate file that Express served as-is with no dynamic logic.

The second was **Express with Handlebars templates and JSON**, used from Module 2 onward for the customer-facing site. Instead of static HTML, the server renders pages dynamically by passing data from JSON files and later from MongoDB into Handlebars templates. The `{{#each trips}}` directive loops over the data and injects it into the HTML before sending it to the browser. This is server-side rendering — the browser receives complete HTML pages.

The third was the **Angular Single-Page Application (SPA)**, used in Modules 6 and 7 for the admin interface. Angular compiles the entire application into a JavaScript bundle that the browser downloads once. After that initial load, all navigation, rendering, and data fetching happens client-side. The browser only calls the REST API for data and never reloads a full page.

### Why MongoDB?

The backend uses MongoDB, a NoSQL document database, because it stores data as JSON-like documents that map naturally to JavaScript objects used throughout the MEAN stack. No format conversion is needed between the database, the API, and the browser. The Mongoose ODM layer adds schema validation and typed models on top of MongoDB, providing the structure of a relational database without its rigidity. Each trip is a self-contained document with all its attributes, which makes a document database a natural fit for this use case.

---

## Functionality

### How JSON Differs from JavaScript and Ties the Stack Together

JavaScript is a programming language that handles logic, functions, conditionals, and object manipulation. JSON is a data format, a text representation of structured data using key-value pairs and arrays. JSON is language-independent and used to transfer data between systems.

In this full stack application, JSON is the connective tissue between every layer. The trips.json file seeded the MongoDB database with initial data. MongoDB stores documents as BSON and Mongoose retrieves them as JavaScript objects. The Express API serializes those objects to JSON using res.json() and sends them over HTTP. Angular's TripDataService receives the JSON response, parses it into JavaScript objects, and passes them to the TripListingComponent which renders the trip cards in the browser. The same data format flows through every layer without transformation.

### Code Refactoring and Reusable UI Components

Several significant refactoring steps improved the application throughout the course.

In Module 2, flat static HTML files were reorganized into an MVC architecture with controllers, routes, and Handlebars views. Header and footer HTML were moved into partials, defined once and reused on every page with the header and footer partial directives.

In Module 3, hardcoded trip data was extracted from the templates and moved into a trips.json file, separating the data layer from the presentation layer.

In Module 5, database access code was moved from the website controller into a dedicated app\_api folder. This separation allowed the REST API to serve multiple clients — the Express website, the Angular SPA, and Postman — without duplicating logic.

In Module 6, the Angular admin SPA was built using reusable components. The TripCardComponent was extracted from TripListingComponent so that card rendering logic is defined once and applied to every trip automatically. Any change to the card layout propagates to every card without touching multiple files.

---

## Testing

### Methods, Endpoints, and Security in a Full Stack Application

HTTP Methods correspond to CRUD operations: GET retrieves data, POST creates new records, PUT updates existing records, and DELETE removes records. Each method carries a specific semantic meaning that the server enforces.

Endpoints are the specific URL paths the API exposes. In this application, /api/trips handles collection operations and /api/trips/:tripCode handles single-resource operations. The :tripCode URL parameter identifies which specific trip the client is operating on.

Testing without security used Postman to send raw HTTP requests to each endpoint. Both GET endpoints were verified to return correct JSON with 200 status codes. The POST endpoint was verified to create new documents in MongoDB and return 201 Created. The PUT endpoint was verified to update existing documents and return the updated record.

Testing with security added complexity because POST and PUT endpoints require a valid JWT token in the Authorization header. Testing required a two-step process: first calling POST /api/login to receive a token, then including that token as a Bearer token in subsequent requests. Testing also verified that requests without a token returned 401 Unauthorized, confirming the security layer correctly rejects unauthenticated access.

The security layer uses Passport.js with two strategies — a local strategy for email/password authentication and a JWT strategy for protecting API endpoints. Passwords are hashed using Node's built-in crypto module with PBKDF2 and a random salt. The JWT token contains the user ID, email, and expiration timestamp, signed with a secret key.

---

## Reflection

### Professional Growth and Marketable Skills

This course has been the most directly applicable coursework in my CS program to my professional goals. I work as an IT Specialist at TidalHealth Peninsula Regional supporting enterprise clinical systems, and my long-term goal is to become an SAP Integration Engineer. CS 465 gave me hands-on experience with every layer of a modern web application — the database, the API, and the frontend — which maps directly to how SAP Integration Suite works: a data tier (SAP HANA), an API tier (OData/REST via SAP Gateway), and a frontend tier (SAP Fiori, which is Angular-based).

The skills I developed that are most relevant to that career path include designing and building RESTful APIs, understanding how JWT authentication works at the implementation level, structuring applications using Separation of Concerns principles, and testing API endpoints systematically using Postman. I also developed confidence working in a TypeScript/Angular environment, which is the same framework SAP Fiori is built on.

Beyond the technical skills, this course developed my ability to think architecturally — to understand why a system is structured the way it is, not just how to make it work. That kind of understanding is what separates someone who follows instructions from someone who can design and troubleshoot enterprise integration solutions. This course moved me significantly closer to the latter.

---

## Repository Structure

cs-465/

├── app.js                    \# Express server entry point

├── app\_server/               \# Customer-facing Express website

│   ├── controllers/          \# Route handler logic

│   ├── routes/               \# URL routing

│   └── views/                \# Handlebars templates and partials

├── app\_api/                  \# REST API layer

│   ├── config/               \# Passport and JWT strategy configuration

│   ├── controllers/          \# API endpoint logic (trips, authentication)

│   ├── models/               \# Mongoose schemas (Trip, User)

│   └── routes/               \# API URL routing with JWT protection

├── app\_admin/                \# Angular SPA admin interface

│   └── src/app/

│       ├── trip-listing/     \# Trip card grid component

│       ├── trip-card/        \# Individual trip card component

│       ├── add-trip/         \# Add trip form component

│       ├── edit-trip/        \# Edit trip form component

│       ├── login/            \# Admin login form component

│       ├── services/         \# Authentication service

│       ├── trip-data.ts      \# HTTP service for trip API calls

│       └── auth-guard.ts     \# Route guard for protected pages

├── public/                   \# Static assets (CSS, images)

└── data/                     \# Seed data JSON files

## Running the Application

Prerequisites: Node.js, MongoDB running locally

\# Install dependencies

npm install

\# Seed the database

node app\_api/models/seed.js

\# Start the Express server

node app.js

\# In a separate terminal, start the Angular dev server

cd app\_admin

npm install

ng serve

- Customer site: [http://localhost:3000](http://localhost:3000)  
- Admin SPA: [http://localhost:4200](http://localhost:4200)  
- REST API: [http://localhost:3000/api/trips](http://localhost:3000/api/trips)

## GitHub Repository

[https://github.com/Goerlitzedmond/cs-465](https://github.com/Goerlitzedmond/cs-465)  
