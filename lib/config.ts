import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

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
const avatars=new Avatars(client);
const databases= new Databases(client);
export const createUser=async(email:string,username:string,password:string)=>{
try{
const userId = ID.custom(username.replace(/[^a-zA-Z0-9-_]/g, "").substring(0, 36));
const newAccount = await account.create(
userId,
email,
password);
if(!newAccount){
throw new Error("Failed to create user");
}else{
    const avatarUrl=avatars.getInitials(username);
    await SignIn(email,password);
    const  newUser=await databases.createDocument(appwriteConfig.databaseId,appwriteConfig.usersCollectionId,ID.unique(),{
        accountId:newAccount.$id,
        email:email,
        username:username,
        avatar:avatarUrl
    })
    return newUser;
}

}catch(error:any){
console.log(error);
throw new Error(error);
}

}

export async function SignIn(email:string,password:string){
    try{
        const session= await account.createSession(email,password);
        console.log(session);
    }catch(error:any){
        console.log(error);
        throw new Error(error);
    }

}