# meraki API task 3 (blog App)

A Blog App with express and My SQL database.

## Features

- API endpoints availabe as per user need
- Authentication and Authorization
- CRUD on User, Post
- Like/Dislike a post
- See all of your posts
- See how many likes/dislikes post

## Lesson Learned

- CRUD operations with on SQL database locally
- Fundamentals of express : FS modules, CRUD operations and middleware
- Using the MVC (Model-View-Controller) architecture
- Database operations (SQL)
- JWT for authentication
- JOI for schema description language and data validation
- Knex to build SQL query

## Tech stacks

- NodeJS - JS runtime environment
- Express - The web framework used
- SQL - Local Database
- JSON Web Token - Security Token
- Postman - API testing
- Git - Version control system
- Objection.js - An SQL-friendly ORM for Node.js

## ScreenShots

<img src="/screenShots/Screenshot1.png" width="49%"/> <img src="/screenShots/Screenshot2.png" width="49%"/>

## Setting Up Your Local Environment

If you wish to play around with the code base in your local environment, do the following

```bash
* Clone this repo to your local machine.
* Using the terminal, navigate to the cloned repo.
* Install all the neccessary dependencies, as stipulated in the package.json file.
* Please ensure to have at least basic knowledge of how Postman work.
* In your .env file, set environment variables for the following:'
    * NODE_ENV=development
    * PORT=3000

    * DB_USER=your-database-localhost
    * DB_PASSWORD=your-database-password

    * SECRET=your-json-web-token-secret
    * JWT_EXPIRES_IN=90d
    * JWT_COOKIE_EXPIRES_IN=90'

* Complete the knex migration setup.
* Start the server.
* Your app should be running just fine.
```

Helpful commands

```bash
$ git clone https://github.com/yourGitHubUsername/merakiCourses-MVC_03-blogApp
$ cd merakiCourses-MVC_03-blogApp
$ npm install
$ knex migrate:make migration_name
$ knex migrate:latest
$ knex seed:run
$ npm run start_dev
```

## Optimizations

- Arranged and grouped all the variables, functions, middleware as per bussiness rule.
- Implemented MVC(Model-View-Controller) architecture
- Proper organized module structure.
- Populate database with seed data independent of migration files.

## API Features

API Documentation can be Found [HERE](https://documenter.getpostman.com/view/20551158/2s8Ysrytti).
Try to play around them😜.

## Author

- [@Pranav108](https://github.com/Pranav108/) 🙋‍♂️
