import mongoose from 'mongoose'


const category = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: [true, "Category name mustbe unique"],

        },
        description: {
            type: String,
            required: [true, "Category description is required"],
        },
        image: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

export const categoryModel =  mongoose.model('Category',category)