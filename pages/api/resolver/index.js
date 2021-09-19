import { User } from "../models/User";

export const resolvers = {
  Query: {
    users:  () => {
      return User.find({})
      
    },
  },
  Mutation: {
    createUser: async (parent, { name, age }, ctx, info) => {
      const user = new User({
        name,
        age,
      });
      return await user.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
      });
    },
  },
};
