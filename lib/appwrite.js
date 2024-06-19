import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

import { storeData } from "../filtered-response";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.suha.cheapify",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DB_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USERS_COLLECTION_ID,
  receiptCollectionId: process.env.EXPO_PUBLIC_RECEIPT_COLLECTION_ID,
  lineItemCollectionId: process.env.EXPO_PUBLIC_LINEITEM_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
  productCollectionId: process.env.EXPO_PUBLIC_PRODUCT_COLLECTION_ID,
};

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", [currentAccount.$id])]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const numDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

export const getUserReceipts = async (userId, timeFrame) => {
  let today = new Date();
  try {
    let numDays = 7;
    if (timeFrame) {
      let timePeriod = timeFrame.toLowerCase();

      if (timePeriod.toLowerCase() === "d") {
        numDays = 1;
      } else if (timePeriod === "w" || timePeriod === "week") {
        numDays = 7;
      } else if (timePeriod === "m" || timePeriod === "month") {
        numDays = numDaysInMonth(today.getFullYear(), today.getMonth() + 1);
      } else if (timePeriod === "y" || timePeriod === "year") {
        numDays = 365;
      }
    }
    let duration = numDays * 24 * 60 * 60 * 1000; //duration in milliseconds
    let startDate = Date.now(); //current time in milliseconds
    let endDate = new Date(startDate - duration);

    let queryList = timeFrame
      ? [
          Query.equal("purchaser", userId),
          Query.greaterThan("purchaseDate", endDate),
          Query.orderDesc("purchaseDate"),
        ]
      : [Query.equal("purchaser", userId), Query.orderDesc("purchaseDate")];
    const receipts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.receiptCollectionId,
      queryList
    );
    return receipts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return null;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createLineItem = async (lineItem) => {
  try {
    const newLineItem = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.lineItemCollectionId,
      ID.unique(),
      {
        productName: lineItem.productName,
        price: parseFloat(lineItem.price),
        quantity: parseInt(lineItem.quantity),
      }
    );
    return newLineItem;
  } catch (error) {
    throw new Error(error);
  }
};

export const createExpense = async (expense, lineItems) => {
  try {
    const receiptImageUrl = await uploadFile(expense.image, "image");

    const newLineItems = await Promise.all(
      lineItems.map((item) => createLineItem(item))
    );

    let lineItemIds = newLineItems.map((item) => item.$id);

    const newExpense = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.receiptCollectionId,
      ID.unique(),
      {
        image: receiptImageUrl,
        store: expense.store,
        purchaseDate: expense.purchaseDate,
        category: expense.category,
        total: parseFloat(expense.total),
        subTotal: parseFloat(expense.subTotal),
        purchaser: expense.userId,
        lineItem: lineItemIds,
      }
    );
    return newExpense;
  } catch (error) {
    throw new Error(error);
  }
};

// appwrite loading data into product collection
export const createProduct = async (item) => {
  const newProduct = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.productCollectionId,
    ID.unique(),
    item
  );
  return newProduct;
};

export const loadData = async () => {
  try {
    const uploadData = storeData.map((item) => {
      let obj = {
        productName: item.title,
        productDesc: `<${item.brand}>${item.description}`,
        itemImage: item.productImage[0].smallUrl,
        price: item.pricing.price,
        pricePerUnit: item.packageSizing,
        store: "superstore",
      };
      return obj;
    });

    const products = await Promise.all(
      uploadData.map((item) => createProduct(item))
    );
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

// export const searchProducts = async (query) => {
//   try{
//     const products = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.
//     )
//   }catch(error){
//     throw new Error(error)
//   }
// }

/*

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

*/
