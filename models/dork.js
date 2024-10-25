const mongoose = require('mongoose');

const dorkSchema = new mongoose.Schema({
    category: String,
    dork: String,
    approved: { type: Boolean, default: false },
    addedBy: String
});

module.exports = mongoose.model('Dork', dorkSchema);