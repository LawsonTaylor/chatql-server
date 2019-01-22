const messages = []
const GLOBAL_CHANNEL = 'GLOBAL_CHANNEL'

const resolvers = {
    Query: {
        // refactor to query firestore db for messages
        messages (root, args, context) {
            return messages;
        }
    },

    Mutation: {
        // refactor - send message to firestore db + return promise
        sendMessage (root, { from, message }, { pubsub }) {
            const newMessage = { id: messages.length + 1, from, message };

            messages.push(newMessage);
            pubsub.publish('GLOBAL_CHANNEL', { messageSent: newMessage });

            return newMessage;
        }
    },

    Subscription: {
        messageSent: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(GLOBAL_CHANNEL);
            }
        }
    }
}

export default resolvers;