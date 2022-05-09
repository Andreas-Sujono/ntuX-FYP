# NTUX - Final Year Project
### Community Oriented Web Platform for Longlife Learners in Computer Networking Courses - Dr. Shao Xuguang, Michelle

#### 1) Frontend
---

- ##### **Technologies**: 
    - HTML, CSS, Javascript
    - ReactJs
    - Redux

- ##### **Study Material**
    - React: https://youtu.be/Dorf8i6lCuk
    - HTML, CSS: https://youtu.be/mU6anWqZJcc
    - JS: https://youtu.be/2qDywOS7VAc
    - Redux: https://redux.js.org/tutorials/essentials/part-1-overview-concepts

- ##### **Prequisites**
    - have `nodeJs` and `npm` installed

- ##### **Project initialization**
    - go to `ntux-frontend` folder
    - run `npm install` to install all the dependencies and libraries
    - run `npm start` to start the development server in `localhost:3000`
    - to call API server, modify the API url in `./src/Store/Services/base.url

#### 2) Backend
---
- ##### **Technologies**: 
    - NodeJs
    - NestJs

- ##### **Study Material**
    - NestJs: https://docs.nestjs.com/
        - know: module, controller, service, entities, authentication, authorization, Database

- ##### **Prequisites**
    - have `nodeJs` and `npm` installed
    - have run Database server -> this project uses an SQL server
    - AWS: to get access key to access AWS S3

- ##### **Project initialization**
    - go to `backend` folder
    - run `npm install` to install all the dependencies and libraries
    - create an `.env` file to store all the secret configuration key as follows:
        ```
        DB_HOST=PUT_VALUE_HERE
        DB_PORT=PUT_VALUE_HERE
        DB_USERNAME=PUT_USERNAME_HERE
        DB_PASSWORD=PUT_PASSWORD_HERE
        DB_NAME=PUT_VALUE_HERE
        SECRET_KEY=PUT_VALUE_HERE
        AWS_ACCESS_KEY=PUT_VALUE_HERE
        AWS_SECRET_KEY=PUT_VALUE_HERE
        PORT=3000
        ```
    - run `npm run start:dev` to start the development server in `localhost:3000`
    - to modify the database to follow the entities structure in the database, you need to run database migration
        - run `npm run build`
        - run `npm run migration:generate` --> will generate an SQL file to update the database schema
        - run `npm run migration:run`
    
    
    
    
    
    
    
    
    
    
