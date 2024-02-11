import invoice from './data/invoice.json' assert { type: "json" }; // assert not support on most browsers

// helpers
import { volumeCreditsFor, amountFor, playFor } from './mainHelpers.js';

const statement = (invoice) => {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {
        // add volume credits 
        volumeCredits += volumeCreditsFor(perf);

        // print line for this order
        result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats) \n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

console.log(statement(invoice));
