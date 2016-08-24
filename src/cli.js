
import * as RPG from './rpg';

// initialized

const rpg = RPG.createRPG(),
    user = 'player';

// hooking up the stdin for the user commands
let stdin = process.openStdin();

console.log('initialized. write your commands, e.g. "help" (confirm by pressing Enter):');
process.stdout.write('> ');
stdin.addListener('data', (data) => {
    try {
        let quit = rpg.parse(user, data.toString().trim(), console.log);
        if (!quit)
            process.stdout.write('> ');
    } catch(error) {
        console.log('error:', error.stack);
        process.stdout.write('> ');
    }
});
