const Wizard = require('../');

const wizard = Wizard.create([
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
