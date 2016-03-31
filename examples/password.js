const Wizard = require('../');

var wizard = new Wizard([
    {
        prompt: 'Username:',
        required: true
    },
    {
        prompt: 'Password:',
        required: true,
        silent: true,
        confirm: 'Confirm password:'
    }
]);

wizard.execute().then(console.log);
