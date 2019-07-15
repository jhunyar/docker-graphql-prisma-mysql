const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    posts: (_, args, { prisma }, info) => {
      return prisma.query.posts(
        {
          where: {
            OR: [
              { title_contains: args.searchString },
              { content_contains: args.searchString },
            ],
          },
        },
        info
      )
    },
    user: (_, args, { prisma }, info) => {
      return prisma.query.user(
        {
          where: {
            id: args.id,
          },
        },
        info
      )
    }
  },
  Mutation: {
    createDraft: (_, args, { prisma }, info) => {
      return prisma.mutation.createPost(
        {
          data: {
            title: args.title,
            content: args.content,
            author: {
              connect: {
                id: args.authorId,
              },
            },
          },
        },
        info
      )
    },
    publish: (_, args, { prisma }, info) => {
      return prisma.mutation.updatePost(
        {
          where: {
            id: args.id,
          },
          data: {
            published: true,
          },
        },
        info
      )
    },
    deletePost: (_, args, { prisma }, info) => {
      return prisma.mutation.deletePost(
        {
          where: {
            id: args.id,
          },
        },
        info
      )
    },
    signup: (_, args, { prisma }, info) => {
      return prisma.mutation.createUser(
        {
          data: {
            name: args.name,
          },
        },
        info
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://prisma:4466',
    }),
  }),
})
server.start({ cors: { origin: ['http://localhost:4000'], credentials: true }, port: 4000 }, () => console.log(`GraphQL server is running on http://localhost:4000`))