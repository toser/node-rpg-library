
export const cmdRegExp = /exit|quit/;

export const run = (player, command, world) => {
    setTimeout(() => { process.exit(0); }, 100); //TODO: save the database and wait for a clean exit
    return [ 'bye' ];
};
