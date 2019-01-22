import { GraphQLServer  } from 'graphql-yoga';
import * as cors from 'cors';
import pubsub from './pubsub';
import typeDefs from './schema';
import  resolvers from './resolver';

const server = new GraphQLServer(
    {
        typeDefs, 
        resolvers, 
        context: { pubsub } 
    });


server.express.use(cors({
    origin: "http://localhost:3000"
}));

server.start(() => { 
    console.log('Server is running on localhost:4000')
});