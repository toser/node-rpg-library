// immediately-invoked
export const generate = function name(params) {
    let uuid = 0;
    return () => uuid++;
}();