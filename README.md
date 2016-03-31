# prompt-wizard

A user-friendly library for creating multi-step CLI interfaces to collect user input.

## Examples:

[Examples](./examples)

In its simplest form, a wizard will ask a series of questions before resolving a promise with the consolidated answers:

```javascript
const wizard = Wizard.create([
    { prompt: 'What is your name?' },
    { prompt: 'What is your favourite colour?' }
]);

wizard.execute().then(console.log);
```

### Custom Keys:

The keys that values are stored on in the final resolve object can be configured by setting a `key` property on the steps.

```javascript
const wizard = Wizard.create([
    {
        prompt: 'What is your name?',
        key: 'name'
    },
    {
        prompt: 'What is your favourite colour?',
        key: 'colour'
    }
]);

wizard.execute().then(console.log);
/*
{ name: 'Lancelot', colour: 'blue' }
*/
```

### Validation:

Fields can be marked as required to force the user to provide an answer. Unanswered fields will result in a warning message being shown and the prompt repeated:

```javascript
const wizard = Wizard.create([
    {
        prompt: 'What is your name?',
        required: true
    },
    {
        prompt: 'What is your favourite colour?',
        required: true
    }
]);

wizard.execute().then(console.log);
```

#### Custom Validation:

Custom validation methods can be added to fields. These should return a falsy value for valid inputs, or a message to be displayed for invalid inputs.

```javascript
const wizard = Wizard.create([
    {
        prompt: 'Username:',
        required: true,
        validate: (input) => input.match/^[a-z0-9]*$/i) ? null : 'username should contain only letters and numbers'
    }
]);

wizard.execute().then(console.log);
```

### Password Input:

Password input can be hidden from view by passing a `password: true` option for the field. This will also prompt the user to re-enter their password. If the second input does not match the first then the user will be prompted again.

```javascript
const wizard = Wizard.create([
    {
        prompt: 'Username:',
        required: true
    },
    {
        prompt: 'Password:',
        required: true,
        password: true
    }
]);

wizard.execute().then(console.log);
```

By default, this will replace input characters with `'*'`. This can be configured, or disabled, by setting a `replace` option.

The confirmation prompt can be set by passing the desired message as a `confirm` option.

### Default Values:

The default value for an input can be passed with the `default` parameter. If this is se to a function then it is called with the previous fields' input values.

```javascript
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
```

### Other Options

This module uses [read](https://www.npmjs.com/package/read) under the hood, so any options that can be passed to read can also be configured on wizard steps.



