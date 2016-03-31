require('colors');

const Promise = require('bluebird');

const read = Promise.promisify(require('read'));

const templatable = [
    'default'
];

function Wizard(steps) {
    this.steps = steps;
}

Wizard.prototype.execute = function () {
    const inputs = {};
    return this.steps.reduce((promise, step) => {
        return promise
            .then(() => executeStep(step, inputs))
            .then(input => inputs[step.key || step.prompt] = input);
    }, Promise.resolve()).then(() => inputs);
};

function executeStep(step, inputs) {

    templatable.forEach((key) => {
        if (typeof step[key] === 'function') {
            step[key] = step[key](inputs);
        }
    });

    if (step.password) {
        step.silent = true;
        if (typeof step.replace === 'undefined') {
            step.replace = '*';
        }
        step.confirm = step.confirm || 'Confirm Password:';
    }

    return read(step)
        .then(input => {
            var result;
            if (typeof step.validate === 'function') {
                result = step.validate(input, inputs);
            }
            if (step.required && !input) {
                result = 'value cannot be empty';
            }
            if (result) { throw new ValidationError(result); }
            return input;
        })
        .then(input => {
            if (step.confirm) {
                return read({
                    prompt: typeof step.confirm === 'string' ? step.confirm : 'Confirm:',
                    silent: step.silent,
                    replace: step.replace
                })
                .then(confirmation => {
                    if (confirmation !== input) { throw new ValidationError('inputs do not match'); }
                    return input;
                });
            }
            return input;
        })
        .catch(e => {
            if (e instanceof ValidationError) {
                console.log('INVALID INPUT:'.red, e.message);
                return executeStep(step, inputs);
            }
            throw e;
        });

}

function ValidationError(message) {
    Error.call(this, message);
    this.message = message;
}
require('util').inherits(ValidationError, Error);

Wizard.create = function (steps) {
    return new Wizard(steps);
}

module.exports = Wizard;