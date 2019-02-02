const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const ItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true 
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type:Number,
        default: 0
    }
});

ItemSchema.plugin(timestamp);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
