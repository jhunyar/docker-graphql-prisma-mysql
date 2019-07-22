# Dockerized graphql-yoga server with Prisma and MySQL Example

This example shows how to **set up Prisma and graphql-yoga using Docker and MySQL** locally on your machine. The only dependency is Docker.

> This example uses a new and empty database. **Learn how to connect Prisma to your existing database [here](https://www.prisma.io/docs/-a003/)**.

## How to use

### 1. Run the service

Execute the script with this command: 

```
docker-compose up
```

### 2. Rebuild image any time a schema change is made

To deploy the datamodel for this example, run the following commands:

```
docker-compose down
docker-compose build
```