const { mongoUtils, dataBase } = require('../lib/utils/mongo.js');
const COLLECTION_NAME = 'productos';

async function getProducts() {
  const client = await mongoUtils.conn();
  const products = await client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    .finally(() => client.close());
  return products;
}

function insertProduct(product) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne(product)
      .finally(() => client.close());
  });
}

function editProduct(product) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {'id':product.id}, // Filtro al documento que queremos modificar
        { $set: product } // El cambio que se quiere realizar
      )
      .finally(() => client.close());
  });
}

module.exports = [getProducts, insertProduct, editProduct];
