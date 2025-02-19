import { Account, Client, ID } from "appwrite";
import conf from '../conf/conf.js';

function generateCustomUserId(name) {
    const sanitized = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 18); // Remove invalid characters and truncate
    if (!sanitized) throw new Error("Name must contain at least one valid character."); // Handle empty names
    const randomPart = Math.random().toString(36).substring(2, 10); // Random string
    const userId = `${sanitized}_${randomPart}`; // Combine parts
    return userId.length <= 36 ? userId : userId.substring(0, 36); // Ensure length <= 36
}




export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({ email, password, name }) {
        try {
            const userId = generateCustomUserId(name);
            console.log("Attempting to create account with userId:", userId);

            const userAccount = await this.account.create(userId, email, password, name);
            if (userAccount) {
                // Log in after successful account creation
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Account creation failed:", error.message); // Log detailed error
            throw error; // Bubble up the error
        }
    }



    async login({ email, password }) {
        try {
            console.log("Logging in with Email:", email, "Password:", password);
            return await this.account.createSession(email, password); // Correct method
        } catch (error) {
            console.error("Login failed:", error.message);
            throw error;
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

