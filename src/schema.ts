// add user + user queries and mutations
// add user location, online status, pubsub for online status.

const typeDefs = `
    type Message {
        id: Int!
        from: String!
        message: String!
    }

    type Query {
        messages: [Message]
    }

    type Mutation {
        sendMessage(from: String!, message: String!): Message
    }

    type Subscription {
        messageSent: Message
    }
`;

module.exports = typeDefs;