import mongoose from 'mongoose';

const defaultDateType = {
    type: Date,
    default: new Date()
};

const userSchema = mongoose.Schema({
    auth_id: String, //captured from firebase
    first_name: String,
    last_name: String,
    email: String,
    purchases: [{
        id: Number,
        name: String,
        shares: Number,
        price: Number,
        cost: Number,
        recent: defaultDateType
    }],
    balance: Number,
    created_at: defaultDateType
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;