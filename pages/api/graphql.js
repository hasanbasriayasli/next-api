import { ApolloServer } from "apollo-server-micro";
import mongoose from "mongoose";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async () => {
    if (mongoose.connections[0].readyState) {
      return;
    }
    console.log('---->',mongoose.connections[0])
    await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongodb Connected");
      })
      .catch((error) => {
        console.log("===>", error.reason);
      });
  }
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
