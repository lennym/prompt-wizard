# prompt-wizard

A user-friendly library for creating multi-step CLI interfaces to collect user input.

## Examples:

[Examples](./examples)

In its simplest form, a wizard will ask a series of questions before resolving a promise with the consolidated answers:

```javascript
var wizard = new Wizard([
    { prompt: 'What is your name?' },
    { prompt: 'What is your favourite colour?' }
]);

wizard.execute().then(console.log);
```

### Custom Keys:

The keys that values are stored on in the final resolve object can be configured by setting a `key` property on the steps.

```javascript
var wizard = new Wizard([
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
var wizard = new Wizard([
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
var wizard = new Wizard([
    {
        prompt: 'Username:',
        required: true,
        validate: (input) => input.match/^[a-z0-9]*$/i) ? null : 'username should contain only letters and numbers'
    }
]);

wizard.execute().then(console.log);
```

### Password Input:

Password input can be hidden from view by passing a `silent: true` options for the field.

```javascript
var wizard = new Wizard([
    {
        prompt: 'Username:',
        required: true
    },
    {
        prompt: 'Password:',
        required: true,
        silent: true
    }
]);

wizard.execute().then(console.log);
```

Password confirmation can be requested by passing `confirm: true`, or a message to be displayed for the confirmation prompt. This will ask for password input a second time, and check that the two values match.

```javascript
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
```

### Default Values:

The default value for an input can be passed with the `default` parameter. If this is se to a function then it is called with the previous fields' input values.

```javascript
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
```

### Other Options

This module uses [read](https://www.npmjs.com/package/read) under the hood, so any options that can be passed to read can also be configured on wizard steps.



