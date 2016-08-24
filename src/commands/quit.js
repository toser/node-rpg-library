
export const cmdRegExp = /^(exit|quit|q)$/;

export const run = (player, command, world) => {
    setTimeout(() => { process.exit(0); }, 500); //TODO: save the database and wait for a clean exit (do not exit the whole process :-/)
    return [ { action : 'quit' } ];
};
