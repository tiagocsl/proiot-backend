import { NoSQLDatabaseWrapper } from '../interfaces/nosql-database-wrapper.interface';
import { Db, MongoClient, ObjectId } from 'mongodb';

export function makeMongoDatasourceConn(dbName: string) {
    const mongoURI = process.env.MONGO_URI as string;
    const client: MongoClient = new MongoClient(mongoURI);
    client
        .connect()
        .then(() => {
            console.log(`Client has been connected!`);
        })
        .catch(() => {
            console.log(`Client has failed to connect!`);
        });

    const db = client.db(dbName);
    return db;
}

export const createCollectionsConn = (
    collectionName: string,
    db: Db
): NoSQLDatabaseWrapper => {
    return {
        getOne: (id) =>
            db.collection(collectionName).findOne({ _id: new ObjectId(id) }),

        getAll: () => db.collection(collectionName).find().toArray(),

        create: (doc) => db.collection(collectionName).insertOne(doc),

        createMany: (devices) =>
            db.collection(collectionName).insertMany(devices),

        deleteOne: (id) =>
            db.collection(collectionName).deleteOne({ _id: new ObjectId(id) }),

        deleteMany: (query) => db.collection(collectionName).deleteMany(query),

        updateOne: (id, data) =>
            db
                .collection(collectionName)
                .updateOne({ _id: new ObjectId(id) }, data),

        updateMany: (query, data) =>
            db.collection(collectionName).updateMany(query, data),
    };
};
