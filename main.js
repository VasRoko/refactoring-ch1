import invoiceData from './data/invoice.json' assert { type: "json" }; // assert not support on most browsers
import playsData from './data/plays.json' assert { type: "json" }; // assert not support on most browsers

const renderPlainText = (data, invoice, plays) => {
    const playFor = (perf) => {
        return plays[perf.playID];
    }
    
    const amountFor = (perf) => {
        let result = 0;
        switch (playFor(perf).type) {
            case "tragedy": 
            result = 40000;
            if (perf.audience > 30) {
                result += 1000 * (perf.audience - 30);
            } 
            break;
            case "comedy": 
            result = 30000;
            if (perf.audience > 20) {
                    result += 10000 + 500 * (perf.audience - 20);                    
                } 
                result += 300 * perf.audience;
            break;
            default: 
                throw new Exception(`unknow type: ${playFor(perf).type}`);
            }
            return result;
    }
        
    const usd = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(value/100);
    }
    
    const volumeCreditsFor = (perf) => {
        let result = 0;
        result += Math.max(perf.audience - 30, 0);
        if ("comedy" == playFor(perf).type) result += Math.floor(perf.audience / 5);
        return result;
    }
    
    const totalVolumeCredits = () => {
        let result = 0;
        for (let perf of invoice.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }
    
    const totalAmount = () => {
        let result = 0;
        for (let perf of invoice.performances) {
            result += amountFor(perf);
        }
        return result;
    }

    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats) \n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
}

const statement = (invoice, plays) => {
    const statementData = {};
    return renderPlainText(statementData, invoice, plays);
}
console.log(statement(invoiceData, playsData));
