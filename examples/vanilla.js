const Wizard = require('../');

const wizard = new Wizard([
    { prompt: 'What is your name?' },
    { prompt: 'What is your favourite colour?' },
    { prompt: 'What is the airspeed velocity of an unladen swallow?' }
]);

wizard.execute().then(console.log);
