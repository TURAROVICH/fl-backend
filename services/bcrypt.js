const bcrypt = require('bcrypt');
const SOLT_COUNT = 10

const generateHash = async (password) => {
    return await bcrypt.hash(password, SOLT_COUNT).then(function(hash) {
        return hash
    });
}

const compareHash = async (old,nep) => {
    return await bcrypt.compare(old, nep);
}

module.exports.generateHash = generateHash 
module.exports.compareHash = compareHash 
