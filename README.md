# angularjs-decorators
Decorators for angular 1.5 apps 


##Examples
---
##Component
```
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
