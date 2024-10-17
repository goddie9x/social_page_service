const mongoose = require('../configs/mongo');

const PageFollowSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    page: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Pages',
    },
    blockedByUser: {
        type: Boolean,
        default: false,
    },
    blockedByPage: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

PageFollowSchema.index({ user: 1, page: 1, createdAt: -1 }, { unique: true });
PageFollowSchema.index({ page: 1, user: 1, createdAt: -1 });

module.exports = mongoose.model('PageFollowers', PageFollowSchema);
