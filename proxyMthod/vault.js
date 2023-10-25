const Cryptr = require('cryptr');

const lock = (obj, password) => {
    const cryptr = new Cryptr(password, { encoding: 'base64', saltLength: 10 });
    const newObj = {};
    for (const i of Object.keys(obj)) {
        newObj[i] = cryptr.encrypt(obj[i]); // newObj.i = cryptr.encrypt(obj.i)
    }
    return new Proxy(newObj, {
        set(target, key, value) {
            return target[key] = cryptr.encrypt(value);
        },
        get(target, key) {
            return target[key]
        }
    })
}

const unLock = (obj, password) => {
    const cryptr = new Cryptr(password, { encoding: 'base64', saltLength: 10 });
    const newObj = {};
    for(const i of Object.keys(obj)){
        newObj[i] = cryptr.decrypt(obj[i]);
    }
    return new Proxy(newObj, {
        set(){
            throw new Error("This is a read-only object") 
        }
    })
}

module.exports = { lock, unLock }