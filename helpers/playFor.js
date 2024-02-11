import plays from '../data/plays.json' assert { type: "json" }; // assert not support on most browsers

export const playFor = (perf) => {
    return plays[perf.playID];
}
