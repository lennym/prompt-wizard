const Wizard = require('../');

const wizard = Wizard.create([
    {
        prompt: 'Username:',
        key: 'username',
        required: true
    },
    {
        prompt: 'Password:',
        key: 'password',
        required: true,
        password: true,
        confirm: 'Re-enter password:'
    }
]);

wizard.execute().then(console.log);
