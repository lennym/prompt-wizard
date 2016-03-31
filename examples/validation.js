const Wizard = require('../');

var wizard = new Wizard([
    {
        prompt: 'Username:',
        required: true,
        validate: (input) => input.match(/a-z0-9/i) ? null : 'username should contain only letters and numbers'
    }
]);

wizard.execute().then(console.log);
