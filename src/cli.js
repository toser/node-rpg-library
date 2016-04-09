
import {EOL} from 'os';
import * as RPG from './rpg';

// initialized

const rpg = RPG.newRPG();

// hooking up the stdin for the user commands
let stdin = process.openStdin();

console.log('initialized. write your commands, e.g. "help" (confirm by pressing Enter):');
process.stdout.write('> ');
stdin.addListener('data', (data) => {
    try {
        let responses = rpg.parse(data.toString().trim());
        console.log(responses.join(EOL));
        process.stdout.write('> ');
    } catch(error) {
        console.log('error: ' + error);
        process.stdout.write('> ');
    }
});
