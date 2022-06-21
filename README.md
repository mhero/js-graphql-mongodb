Simple graphql server with apollo-server-express.<br>
This is connected to a mongodb database( defined in .env).

Simple CRUD Graph API backed by a database that does the following:

creates a user
fetches a list of users
updates a user
deletes a user

## Install

```bash
npm install
```

## Start local

```bash
cp .env.example .env
```

Change .env variables if needed.

```bash

npm run dev
```

## Docker local

```bash
cp .env.docker.example .env
```

Change .env variables if needed.

```bash
docker compose up
```

## Client

You can run graphql query/mutations from the client: localhost:3000/api<br>
By default right now in port 3000, to change change in .env

## GraphQL example

### Query hello world/app status

```graphql
query {
  hello
}
```

### Query user

```graphql
query Query($getUserId: ID) {
  getUser(id: $getUserId) {
    id
    firstName
    lastName
    note
  }
}
```

```graphql
{
  "getUserId": "62a545b493045f1a658b5e19"
}
```

### Query get all user list

```graphql
query GetAllUsers {
  getAllUsers {
    id
    firstName
    lastName
    note
  }
}
```

### Mutation create user

```graphql
mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    id
    firstName
    lastName
    note
  }
}
```

```graphql
{
  "user": {
    "firstName": "name",
    "lastName": "lastname",
    "note": "test"
  }
}
```

### Mutation update user

```graphql
mutation UpdateUser($updateUserId: ID, $user: UpdateUserInput) {
  updateUser(id: $updateUserId, user: $user) {
    id
    firstName
    lastName
    note
  }
}
```

```graphql
{
  "user": {
    "firstName": "names",
    "lastName": "lastnames",
    "note": "tests"
  },
  "updateUserId": "62a545b493045f1a658b5e19"
}
```

### Mutation delete user

```graphql
mutation DeleteUser($deleteUserId: ID) {
  deleteUser(id: $deleteUserId)
}
```

```graphql
{
  "deleteUserId": "62a545b493045f1a658b5e19"
}
```

![client screenshot](https://i.postimg.cc/cdRHsjxV/Screen-Shot-2022-06-11-at-7-18-40-PM.png)
