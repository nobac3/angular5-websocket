# angular5-websocket

This is a simple chatbox with Angular5, NodeJs Mongoose and Socket io.

The chatbox requires you to have some knowledge in Mongodb.

# Backend

## Set up Node.js

```
cd socket-server
npm i socket.io express body-parser cors mongoose
```

## Start MongoDB

In a new terminal:

```
mongod
```

Leave Mongodb connected.

## Start Node.js

```
nodemon src/app.js
```
Leave backend connected.

# Frontend 

In a new terminal start:

```
cd frontend 
npm install -g @angular/cli
npm install --save-dev @angular-devkit/build-angular
```