const { Int32 } = require('bson')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    product_description: {
        type: String,
        required: [true, 'Please enter your phone']
    },
    product_price: {
        type: String,
        required: [true, 'Please enter your email']
    },
    stock_number: {
        type: String,
        required: [true, 'Please enter your password']
    },
    images: [
        {
            data: Buffer,
            contentType: String
        }
    ],
    CategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    }
},
{   
    collection: 'Products',
    timestamp: true
}) 

module.exports = mongoose.model('Products', productSchema)
