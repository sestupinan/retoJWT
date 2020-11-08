const mongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/';
const dataBase = 'ejJWT';

function mongoUtils() {
  const mu = {};

  // Esta variable almacenará la conexión a MongoDB.
  // Tenga presente que es una promesa que deberá ser resuelta.
  /* mu.conn = mongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    keepAlive: 1,
    auto_reconnect: true,
  }); */
  mu.conn = () => {
    const client = new mongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.connect();
  };
  return mu;
}

process.on('SIGINT', async function () {
  console.log('connection ended');
  const client = await mongoUtils().conn();
  client.close().then((data) => console.log('conn ended'));
});

exports.mongoUtils = mongoUtils();
exports.dataBase = dataBase;
