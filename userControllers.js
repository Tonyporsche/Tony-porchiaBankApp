const { User } = require('../modals/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../constant');

const saltRounds = 5;

const registerUser = async (name, email, password) => {
    const hash = bcrypt.hashSync(password, saltRounds);
    const user = new User({ name, email, password: hash });
    await user.save();
    return user;
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('login failed');
    }

    const token = jwt.sign({ id: user._id }, TOKEN_KEY);

    return { user, token };
}

const profileInfo = async (id) => {
    return await User.findById(id);
}

const updateUser = async (id, name, email, password) => {
    let updateQuery = {};
    if (name) {
        updateQuery.name = name;
    }
    if (email) {
        updateQuery.email = email;
    }
    if (password) {
        const hash = bcrypt.hashSync(password, saltRounds);
        updateQuery.password = hash;
    }

    return await User.findByIdAndUpdate(id, updateQuery);

}

module.exports = { registerUser, loginUser, profileInfo, updateUser }