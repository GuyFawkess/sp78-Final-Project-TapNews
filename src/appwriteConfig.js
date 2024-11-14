import { Client, Databases, Account } from 'appwrite';

export const PROYECT_ID = '67349249000427559ede';
export const DATABASE_ID = '67349d30002fad9382b5';
export const COLLECTION_ID_MESSAGES = '67349d3d00002a463c4d';


const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67349249000427559ede');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;