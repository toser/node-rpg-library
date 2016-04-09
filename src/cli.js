
// initialized

//TODO: initialize Parser & World

// hooking up the stdin for the user commands
var stdin = process.openStdin();

console.log('initialized. write your commands, e.g. "help" (confirm by pressing Enter):');
stdin.addListener("data", function(data) {
    try {
        console.log('unknown command: ' + data.toString().trim());
    } catch(error) {
        console.log('error: ' + error);
    }
});
