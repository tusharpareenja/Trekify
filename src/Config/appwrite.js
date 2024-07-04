import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6675659e002582a50160");

export const account = new Account(client);
export const databases = new Databases(client, "667567cd002a30d963df");
export const storage = new Storage(client);
