// add User online / offline mutations
// add user location, pubsub for online status.

const typeDefs = `
    type Message {
        id: String!
        userId: String!
        text: String!
    }

    type User {
        id: String!
        name: String!
        online: Boolean!
        messages: [Message]
    }

    type Query {
        messages(userId: String!): [Message]
        users: [User]
        user(id: String!): User
    }

    type Mutation {
        sendMessage(userId: String!, text: String!): Message
        createUser(name: String!): User
    }

    type Subscription {
        messageSent: Message
        userAdded: User
    }
`;

export default typeDefs;