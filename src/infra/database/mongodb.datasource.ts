import { MongoClient } from 'mongodb';

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
