const Bank = require("./bank");

class Citibank extends Bank{
    processPay(){
        return console.log(
            `Your payment of ${this.amount} for
            ${this.account} has been processed by Citibank`
            );
    }
    processRefund(){
        return console.log(
            `Your refund amount of ${this.amount} for
            ${this.account} has been processed by Citibank`
            );
    }
}

module.exports = Citibank;