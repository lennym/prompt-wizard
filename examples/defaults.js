const Wizard = require('../');

var wizard = new Wizard([
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
