import mongoose from 'mongoose';
import UserModel from '../../models/userModel.js';

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findOne({ auth_id: id });
        res.status(200).json(user);

    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const createUser = async (req, res) => {
    const { first_name, last_name, email, auth_id, purchases, balance } = req.body;
    const newUser = new UserModel({ first_name, last_name, email, auth_id, purchases, balance });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(404).json({message: err.message});
    }   
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    await UserModel.findByIdAndRemove(id);
    res.json({ message: 'User deleted successfully.' });
}

export const updateUser = async (req, res) => {
    // const { id } = req.params;
    const { first_name, last_name, email} = req.body;
    const updatedUser = new UserModel({ first_name, last_name, email });
    
    try {
        await UserModel.findByIdAndUpdate(_id, updatedUser);
        res.status(201).json(updatedUser);
    }  catch(err){
        res.status(404).json({message: err.message});
    }
}

export const addPurchase = async (req, res) => {
    const { balance, _id, shareCount, cost, name, price } = req.body;
    
    try {
        
        const user = await UserModel.findOne({ _id: _id });
        const purchases = user.purchases;
        const coinExists = purchases.find(obj => obj.name === name);

        if(coinExists === undefined){
            purchases.push({
                name: name,
                shares: shareCount,
                price: price,
                cost: cost,
                recent: new Date()
            });
            
        } else {
            purchases.map(obj => {
                if(obj._id === coinExists._id){
                    obj.shares = obj.shares + shareCount;
                    obj.cost = obj.cost + cost;
                    obj.price = price;
                    obj.recent = new Date();
                }
            });
        }

        user.balance = balance;
        user.save();
        res.status(201).json(user);

    }  catch(err){
        res.status(404).json({message: err.message});
    }
}