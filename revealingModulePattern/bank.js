let _accounts = [];

const _findAccount = (name) => {
    return _accounts.find(x => x.name === name)
}

const createAccount = (name, monies = 0) => {
    if (!(_findAccount(name))) {
        _accounts.push({
            name,
            monies
        });
        return console.log(`new account created for ${name} in array ${JSON.stringify(_accounts)}`)
    } else {
        return console.log("Account Already exist")
    }
};

const credit = (name, money) => {
    if (_findAccount(name)) {
        _accounts.forEach((accout) => {
            if (accout.name === name) {
                accout.monies = accout.monies + money
            }
        })
    } else {
        return "You don't have account"
    }
}

const debit = (name, money) => {
    if (_findAccount(name)) {
        _accounts.forEach((account) => {
            if (account.name === name) {
                account.monies = account.monies - money
            }
        })
    } else {
        return "Account not found"
    }
}

const getFunds = (name) => {
    if (_findAccount(name)) {
        return _accounts.find((acc) => acc.name === name['monies'])
    } else {
        return "Account not found!"
    }
}

module.exports = {
    createAccount,
    credit,
    debit,
    getFunds
}