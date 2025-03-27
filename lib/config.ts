import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";


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
  username: string,
  phone: string,
  password: string
) => {
    
  try {

    const newAccount = await account.create(ID.unique(), email, password);
    if (!newAccount) throw new Error("Account creation failed");
 
    const session = await SignIn(email, password);
    if(!session) throw new Error("Sign-In failed after account creation");

    const avatarUrl = avatars.getInitials(username);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        phone: phone,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const SignIn=async(email: string, password: string) =>{
  try {
    await account.deleteSessions();
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function SignOut() {
  try {
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
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
    throw new Error("User not found");
  }

  const userData = currentUser.documents[0];

  return {
    accountId: userData.accountId,
    email: userData.email,
    username: userData.username,
    phone: userData.phone || "",
    avatar: userData.avatar || "",
  };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

