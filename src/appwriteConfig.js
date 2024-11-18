import { Client, Databases, Account } from 'appwrite';

export const PROYECT_ID = process.env.PROYECT_ID;
export const DATABASE_ID = process.env.DATABASE_ID;
export const COLLECTION_ID_MESSAGES = process.env.COLLECTION_ID_MESSAGES;


const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.PROYECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);

export default client;