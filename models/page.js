const mongoose = require('../configs/mongo');

const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    cover: {
        type: String,
    },
    admin: [{
        type: mongoose.Schema.ObjectId,
        required: true,
    }],
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
    },
});

PageSchema.index({ admin: 1 });


module.exports = mongoose.model('Pages', PageSchema);