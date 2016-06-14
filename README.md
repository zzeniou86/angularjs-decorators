# angularjs-decorators
Decorators for angular 1.5 apps 

######Note (14th June 2016)
A new styleguide has been released (https://github.com/toddmotto/angular-styleguide) and the decorators will be refactored to support it

##Examples

Few examples..

####Component
```javascript
@Component({
    selector: "hello-world",
    template: "<div> Hello {{$ctrl.text}} </div>",
})
export class HelloWorldComponent {
    hello:string;
    constructor() {
        this.hello = "World"
    };
  }
```

#####TODO
-------
* Service Decorator
* Constant
* Value
* Provider
* (maybe) Interceptor
