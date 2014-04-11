var promiseEnd,
    getPromiseEnd = function(nativeEnd) {
        
        return promiseEnd = function (success, failure) {
            var self = this,
                promise = new Promise(function (resolve, reject) {
                    nativeEnd.call(self, function (error, res) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(res);
                        }
                    });
                });

            if (success) {
                promise = promise.then(success, failure);
            }
            
            return promise;
        };
    };

module.exports = function (request) {
    request.end = promiseEnd || getPromiseEnd(request.end);
};
