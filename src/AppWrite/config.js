import conf from "../../src/conf/conf.js";
import { Client, Databases, ID, Storage, Query,Permission,Role } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // Your Appwrite Endpoint
      .setProject(conf.appwriteProjectID); // Your project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createDocuments(data) {
    const {
      title,
      content,
      featuredImage,
      status,
      userId,
    } = data;

    return await this.databases.createDocument(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      ID.unique(),
      {
        title,
        content,
        featuredImage,
        status,
        userId,
      }
    );
  }

  async updatedocument(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

async getPosts(queries = []) {
  try {
    const defaultQueries = [
      Query.equal("status", "active"),
      Query.orderDesc("$createdAt"),
      ...queries
    ];

    return await this.databases.listDocuments(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      defaultQueries
    );
  } catch (error) {
    console.log("Appwrite service :: getPosts :: error", error);
    return false;
  }
}


async getUserPosts(userId) {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt")
      ]
    );
  } catch (error) {
    console.log("Appwrite service :: getUserPosts :: error", error);
    return false;
  }
}

  async submitContact(data) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteContactCollectionID,
        ID.unique(),
        data
      );
    } catch (error) {
      console.log("Appwrite service :: submitContact :: error", error);
      throw error;
    }
  }

async uploadFile(file) {
  return await this.bucket.createFile(
    conf.appwriteBucketID,
    ID.unique(),
    file
  );
}

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketID, fileId);
  }
}

const service = new Service();
export default service;
