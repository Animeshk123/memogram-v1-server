const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


const matchPassword = (userPassword, hashPassword) => {
    return bcrypt.compareSync(userPassword, hashPassword);
}

module.exports = { hashPassword, matchPassword };
