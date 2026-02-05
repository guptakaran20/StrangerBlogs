import conf from "../../src/conf/conf.js";
import { Client, Account,ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectID); // Your project ID
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
  try {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );
    return userAccount;
  } catch (error) {
    throw error;
  }
}

    
    async login({ email, password }) {
  try {
    try {
      await this.account.deleteSessions();
    } catch (_) {}

    return await this.account.createEmailPasswordSession(
      email,
      password
    );
  } catch (error) {
    throw error;
  }
}

    async getCurrentUser(){
        try{
            const user = await this.account.get();
            return user;
        }
        catch(error){
            console.log("No user logged in");
            return null;
            
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            throw error;
        }
    }

}

const authservice = new AuthService();

export default authservice;