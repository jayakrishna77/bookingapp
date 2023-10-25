const Bank = require("./bank");

class Chase extends Bank{
    processPay(){
        return console.log(
            `Your payment of ${this.amount} for
            ${this.account} has been processed by Chase`
            );
    }
    processRefund(){
        return console.log(
            `Your refund amount of ${this.amount} for
            ${this.account} has been processed by Chase`
            );
    }
}

module.exports = Chase;