import { GraphQLServer  } from 'graphql-yoga';
import pubsub from './pubsub';
import typeDefs from './schema';
import  resolvers from './resolver';


const server = new GraphQLServer(
    {
        typeDefs, 
        resolvers, 
        context: { pubsub } 
    });

server.start(() => { 
    console.log('Server is running on localhost:4000')
});