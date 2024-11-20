    const getDb = require('../util/database').getDb;
    const { ObjectId } = require('mongodb');

    class Blog {
        constructor(title, content, photolink, author, createdAt = new Date()) {
            this.title = title;
            this.content = content;
            this.photolink = photolink;
            this.author = author;
            this.createdAt = createdAt;
        }

        // Method to save a new blog
        save() {
            const db = getDb();
            return db.collection('blogs').insertOne({
                title: this.title,
                content: this.content,
                photolink: this.photolink,
                author: this.author,
                createdAt: this.createdAt
            });
        }

        // Static method to fetch all blogs
        static fetchAll() {
            const db = getDb();
            return db.collection('blogs').find().toArray();
        }

        // Static method to fetch a single blog by ID
        static findById(blogId) {
            const db = getDb();
            return db.collection('blogs').findOne({ _id: new ObjectId(blogId) });
        }

        // Static method to delete a blog by ID
        static deleteById(blogId) {
            const db = getDb();
            return db.collection('blogs').deleteOne({ _id: new ObjectId(blogId) });
        }

        static fetchByMatchingTitle(searchString) {
            const db = getDb();
            const regex = new RegExp(searchString, 'i'); // 'i' flag makes it case-insensitive
            return db.collection('blogs').find({ title: { $regex: regex } }).toArray();
        }
    }

    module.exports = Blog;
