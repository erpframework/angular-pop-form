# angular-pop-form
AngularJS Pop Form

Create forms with javascript

## Installation

Install with bower

```bash
bower install angular-pop-form
```

Add pop-form.js to your project:

```html
<script src="/js/pop-form.js"></script>
```

Include module in your angular app:

```javascript
angular.module('app', ['PopForm']);
```

## Usage

You can use the directive pop-form to create your form from a config object:

```html
<pop-form form="formConfig"></pop-form>
```

There are other attributes used by the directive, and these are still being worked out, but currently you can use:

| option | description | value |
|---|---|---|
| `form` | Config object to build the form | string ($scope object)
| `on-init` | Callback for initializing form model | string ($scope function)
| `on-submit` | Callback after form is validated and ready to submit | string ($scope function)

The form config object is a nested object which looks something like this:

```javascript
$scope.formConfig = {
  
  // Optional, add classes to <form>
  classes: ['form-horizontal', 'example-form'],
  
  // Add suffix to all labels
  labelSuffix: ':',
  
  // Form elements
  elements: {
    
    // Key, becomes element id, element name and model property
    name: {
      // Optional, element label
      label: 'Name',
      // Optional, Input type (defaults to 'text')
      type: 'text',
      // Optional, placeholder
      placeholder: 'Enter name...'
    },
    
    // Group some fields together
    address: {
      type: 'group',
      // Adds classes to group
      classes: 'form-inline',
      // Adds classes to each form element wrapper
      wrapperClasses: 'col-md-4',
      elements: {
        address: { label: 'Address' },
        city: { label: 'City' },
        state: { label: 'State', type: 'select', options: $scope.states }
      }
    }
    
  }
};
```

Check out the example-form to see all the options and callbacks you can use
