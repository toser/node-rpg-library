
import * as RPG from './rpg';

// initialized

const rpg = RPG.createRPG(),
    user = 'player',
    indicateUserInput = () => {
        process.stdout.write('> ');
    };

// hooking up the stdin for the user commands
let stdin = process.openStdin();
console.log('initialized. write your commands, e.g. "help" (confirm by pressing Enter):');
indicateUserInput();
stdin.addListener('data', (data) => {
    try {
        rpg.parse(user, data.toString().trim(), console.log, indicateUserInput);
    } catch(error) {
        console.log('error:', error.stack);
        process.stdout.write('> ');
    }
});
