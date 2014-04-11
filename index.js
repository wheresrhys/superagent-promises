var promiseEnd,
    getPromiseEnd = function(nativeEnd) {

    return promiseEnd || (promiseEnd = function (success, failure) {
        var resolver,
            rejecter,
            promise = new Promise(function (resolve, reject) {
                resolver = resolve;
                rejecter = reject;
            });
            
        nativeEnd.call(this, function (error, res) {
            if (error) {
                rejecter(error);
            } else {
                resolver(res);
            }
        });
        if (success) {
            promise = promise.then(success, failure);
        }
        return promise;
    });
};

module.exports = function (request) {
    request.end = getPromiseEnd(request.end);
};