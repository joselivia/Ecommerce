import AsyncStorage from "@react-native-async-storage/async-storage";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
export interface User {
  id: string;
  accountId: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
}
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "67e14174000f4325195b",
  Platform: "com.joselivia.lekovet",
  databaseId: "67e14c27000a669e1017",
  usersCollectionId: "67e14ca5003c34637e30",
  productsCollectionId: "67e14d2b000cc50e93bb",
  storageId: "67e1511b0014240232a7",
};
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.Platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, avatars, databases,storage };
export const createUser = async (
  email: string,
  password: string,
  username: string,
) => {     
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) {
      console.error('Account creation returned null/undefined');
      throw new Error("Account creation failed");
    }
    const avatarUrl = avatars.getInitials(username);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
      return newUser;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};


export async function signIn(email: string, password: string){
  try {
    try {
      await account.get();
      await account.deleteSession("current");
    } catch (error: any) {
       throw new Error(error.message || "Login failed");
    }
     const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Login session was not created.");
    await AsyncStorage.setItem("sessionId", session.$id);
    const user =await getCurrentUser();
    return user;

  } catch (error: any) {

    throw new Error(error.message || "Login failed");
  }
}


export async function signOut() {
  try {
    await account.deleteSession("current");
    await AsyncStorage.removeItem("sessionId");
     return true;
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign out");
  }
}

export async function checkSession() {
  try {
    const sessionId = await AsyncStorage.getItem("sessionId");
    if (!sessionId) {
      console.log("No session ID found in AsyncStorage");
      return null;
    }
    console.log("Found stored session ID:", sessionId);
    const user = await account.get();
    console.log("Session validated, current user:", user.$id);
    return await getCurrentUser();
  } catch (error: any) {
    console.error("Session check failed:", error.message);
    await AsyncStorage.removeItem("sessionId"); 
    return null;
  }
}
export const getCurrentUser=async()=> {
  try {
    const currentAccount = await account.get();
    if(!currentAccount) throw new Error("Account not found");
 const currentUser=await databases.listDocuments(
  appwriteConfig.databaseId,
  appwriteConfig.usersCollectionId,
  [
    Query.equal("accountId", currentAccount.$id)
  ]
)
if (!currentUser || currentUser.documents.length === 0) {
  console.error("No user document found for account:", currentAccount.$id);
    throw new Error("User not found");
  }
  const userData = currentUser.documents[0];
  return {
    id: userData.$id,
    accountId: userData.accountId,
    email: userData.email,
    username: userData.username,
    phone: userData.phone || "",
    avatar: userData.avatar || "",
  };
  } catch (error: any) {console.error("Get current user error:", error.message);
    throw new Error(error.message || "Failed to retrieve current user");
  }
}
// products
export const getAllProducts = async () => {
  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId
    );
    return products.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getLatestProducts = async () => {
  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [Query.orderDesc('$createdAt'),Query.limit(7)]
    );
    return products.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}

const getProductsByCategory = async (category: string) => {
  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [Query.equal("category", category)]
    );
    return products.documents;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};