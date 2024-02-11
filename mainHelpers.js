import plays from './data/plays.json' assert { type: "json" }; // assert not support on most browsers

export const playFor = (perf) => {
    return plays[perf.playID];
}

export const volumeCreditsFor = (perf) => {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" == playFor(perf).type) result += Math.floor(perf.audience / 5);
    return result;
}

export const amountFor = (perf) => {
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
