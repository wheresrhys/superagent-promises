'use strict';

var protoEnd,
    nativePromiseEnd,
    getPromiseEnd = function(previousEnd) {
        
        return function (success, failure) {
            var self = this,
                promise = new Promise(function (resolve, reject) {
                    previousEnd.call(self, function (error, res) {
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
    protoEnd = protoEnd || request.constructor.prototype.end;
    request.end = request.end === protoEnd ? (nativePromiseEnd || (nativePromiseEnd = getPromiseEnd(protoEnd))) : getPromiseEnd(request.end);
};

// useful for testing
module.exports.uncache = function () {
    nativePromiseEnd = undefined;
};
