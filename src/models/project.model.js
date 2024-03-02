import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    desc:{
        type: String,
        required: true
    },

    likes: {
        count: {
          type: Number,
          default: 0
        },
        users: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }]
      },

    projectImg:{
        public_id:{
            type: String,
            required:true,
        },

        url:{
            type:String,
            required: true,
        }
    },

    url:{
        type: String,
        required: true
    }


},{timestamps: true,})

projectSchema.methods.addLike = function(userId) {
    // Check if the user already liked the post
    if (!this.likes.users.includes(userId)) {
      this.likes.count++;
      this.likes.users.push(userId);
    }
  };
  
  // Method to remove a like
projectSchema.methods.removeLike = function(userId) {
    const index = this.likes.users.indexOf(userId);
    if (index !== -1) {
      this.likes.count--;
      this.likes.users.splice(index, 1);
    }
  };
  


export const  Project = mongoose.model("Project",projectSchema)