
export const cmdRegExp = /^(help|h)$/;

export const run = (player, command, world) => {
    return [ '>>> usage:', // TODO: *prefix* for all commands is `...` ?
            '1. `group <name of group>`',
            '2. `character <race of character>`',
            '3. `start`',
            'from there on: use `where`, `inventory`, `pickup`, `move`, `stop`' ];
};
