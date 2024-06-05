require("dotenv").config();

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.suha.cheapify",
  projectId: process.env.APPWRITE_PROJECT_ID,
};
