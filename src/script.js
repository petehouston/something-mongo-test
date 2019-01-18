var mapFunc = function () {
    emit(this.user_id, this.questions);
}

var reduceFunc = function (userId, questions) {
    return questions;
}

var finalFunc = function (userId, q) {

    var abs = function (x) { if(x < 0) return (-1) * x; return x; };

    var rangeSum = function (from, to) {
        var _s = 0;
        for(var _i = from; _i <= to; _i++) {
            _s += abs(q['q' + _i] - user.questions['q' + _i]);
        }

        return _s / (to - from + 1);
    }

    q.score = 5 - (rangeSum(1, 20) + rangeSum(21, 61) + rangeSum(62, 75) + rangeSum(76, 95) + rangeSum(96, 115) + rangeSum(116, 127) + rangeSum(128, 157)) / 7;

    for(var _i = 1; _i <= 157; _i++) {
        delete q['q' + _i];
    }

    return q;

}

db.users.mapReduce(mapFunc, reduceFunc, {
    out: "ms",
    query: {"user_id": {$ne: 1}},
    scope: {
        user: db.users.findOne({"user_id": 1})
    },
    finalize: finalFunc
})