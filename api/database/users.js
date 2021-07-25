const mongodb = require('mongodb');

const uri = process.env.MONGODB_URI
export const loadUserCollection = async () => {
  const client = await mongodb.MongoClient.connect
  (uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db('user-api').collection('users');
}
