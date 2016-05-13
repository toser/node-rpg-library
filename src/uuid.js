// immediately-invoked
export const generate = function () {
    let uuid = 0;
    return () => uuid++;
}();