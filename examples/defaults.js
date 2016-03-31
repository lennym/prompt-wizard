const Wizard = require('../');

const wizard = Wizard.create([
    {
        prompt: 'Name:',
        key: 'name',
        required: true
    },
    {
        prompt: 'Username:',
        key: 'username',
        required: true,
        default: (i) => i.name.toLowerCase().replace(' ', '.')
    }
]);

wizard.execute().then(console.log);
