import { Client, Account } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.suha.cheapify",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DB_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USERS_COLLECTION_ID,
  videoCollectionId: process.env.EXPO_PUBLIC_VIDEOS_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = (username, email, password) => {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
