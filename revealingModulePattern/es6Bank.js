const accounts = [];
const findAccount = Symbol("findAccount");

class Bank {
    // constructor() {
    //     this.accounts = [] // this class varieable can out saide of the funciton
    // }
    [findAccount](name) {
        return accounts.find(acc => acc.name === name);
    }
    createAccount(name, monies = 0) {
        if (!this[findAccount](name)) {
            accounts.push({
                name, monies
            });
            console.log("account created")
        }else {
            console.log("Account already exeits")
        }
    }
    credit(name, money){
        if(this[findAccount](name)){
            accounts.forEach(acc =>{
                if(acc.name === name){
                    acc.monies = acc.monies + money
                }
            })
        }else{
            console.log("Account not found");
        }
    }
    debit(name, money){
        if(this[findAccount](name)){
            accounts.forEach(acc =>{
                if(acc.name === name){
                    acc.monies = acc.monies - money
                }
            })
        }else{
            console.log("Account not found");
        }
    }
    getFunds(name){
        if(this[findAccount](name)){
            return accounts.find(acc => acc.name === name)["monies"];
        }
    }
}

module.exports = new Bank();