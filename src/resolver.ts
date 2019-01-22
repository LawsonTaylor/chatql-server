import { User, Message } from './models';
const GLOBAL_CHANNEL = 'GLOBAL_CHANNEL';
const global_messages: Message[] = [];
const users: User[] = [];

const resolvers = {
    Query: {
        // refactor to query firestore db for messages
        messages (root, args: { userId: string }, context) {
            return global_messages.filter((msg) => {
                return msg.userId == args.userId;
            });
        },

        users (root, args, context) {
            return users.map((user) => {
                const messages = global_messages.filter((msg) => {
                    return msg.userId == user.id;
                });
                return {
                    ...user,
                    messages
                }
            });
        },

        user(_: null, args: { id: string }) {

            const id = args.id;

            const user = users.find((user: User) => {
                return user.id === id;
            });

            const messages = global_messages.filter((msg) => {
                return msg.userId == id;
            });

            return {
                ...user,
                messages
            }

        },

    },

    Mutation: {
        // refactor - send message to firestore db + return promise
        sendMessage (root, { userId, text }, { pubsub }) {

            const newMessage: Message = { id: `M_${global_messages.length + 1}`, text, userId };

            global_messages.push(newMessage);

            pubsub.publish('GLOBAL_CHANNEL', { messageSent: newMessage });

            return newMessage;
        },

        createUser (root, { name }, { pubsub }) {

            const newUser: User = { id: `U_${users.length + 1}`, name, online: true };

            users.push(newUser);

            pubsub.publish('GLOBAL_CHANNEL', { userAdded: newUser });

            return newUser;
        }
    },

    Subscription: {
        messageSent: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(GLOBAL_CHANNEL);
            }
        },
        userAdded: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(GLOBAL_CHANNEL);
            }
        }
    }
}

export default resolvers;