const { Transaction } = require("../modals/transactionModal");
const { User } = require("../modals/userModal");


const deposit = async (amount, id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('invalid account');
    }
    const transaction = new Transaction({ amount, type: 'deposit', previousBalance: user.balance, afterBalance: user.balance + amount, user: user._id });
    await transaction.save();

    user.balance += amount;
    await user.save();
    return { user, transaction };
}

const withdraw = async (amount, id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('invalid account');
    }
    if (user.balance < amount) {
        throw new Error('account do not have sufficient money');
    }

    const transaction = new Transaction({ amount, type: 'withdraw', previousBalance: user.balance, afterBalance: user.balance - amount, user: user._id });
    await transaction.save();

    user.balance -= amount;
    await user.save();
    return { user, transaction };
}

const filterTransactions = async (type, id) => {
    let filter = { user: id };
    if (type) {
        filter.type = type;
    }
    return await Transaction.find(filter);
}

module.exports = { deposit, withdraw, filterTransactions }