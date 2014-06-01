var promiseEnd,
    getPromiseEnd = function(nativeEnd) {
        
        return promiseEnd = function (success, failure) {
            var self = this,
                promise = new Promise(function (resolve, reject) {
                    nativeEnd.call(self, function (error, res) {
                        if (error || !res.ok) {
                            reject(error || res);
                        } else {
                            resolve(res);
                        }
                    });
                });

            if (success || failure) {
                promise = promise.then(success, failure);
            }
            
            return promise;
        };
    };

module.exports = function (request) {
    request.end = promiseEnd || getPromiseEnd(request.end);
};

// useful for testing
module.exports.uncache = function () {
    promiseEnd = undefined;
};
