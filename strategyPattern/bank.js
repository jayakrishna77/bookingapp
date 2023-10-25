// strategy

class Bank{
    constructor(amount, account){
        this.account = account;
        this.amount=amount;
    }

    pay(){
        return this.processPay();
    }

    refund(){
        return this.processRefund();
    }
}

module.exports = Bank;