# Console Helper Service

### Problem
Sometimes you want to access informations from within the application, alter variables or trigger functions, but don't want to do a lot of debugging.

### Solution
We created a service which uses the window object to enable us to call our own functions from the browsers console.

### Example
```typescript
import { Injectable } from "@angular/core";


@Injectable()
export class ConsoleHelperService {
    private helpTextList: { [fnName: string]: string };
    private customNamespace: { [fnName: string]: (...args: any[]) => any };

    constructor(@Inject('window') window: Window) {
        this.helpTextList = {};
        this.customNamespace = {};
        (<any>window).custom = this.customNamespace;
    }

    public registerFunction(name: string, fn: (...args: any[]) => any, help?: string): void {
        this.helpTextList[name] = help;
        this.customNamespace[name] = fn;
    }
}
```
Add a help function to see all available functions
```typescript
private help(): void {
    console.log("Functions defined in the custom namespace namespace:");
    for (const fnName in this.customNamespace) {
        console.log(fnName, ":", this.helpTextList[fnName]);
    }
}
```
and register it in the namespace
```typescript
this.registerFunction("help", () => this.help(), "Show this help text");
```
Register new functions
```typescript
this.consoleHelperService.registerFunction("enableLogging", () => {
    this.logToConsole = true;
});
```
Or
```typescript
this.consoleHelperService.registerFunction("version", () => this.createVersionInfo(), "Show version info");
```

### Benefit
Easy and fun way to interact with the application without digging around in the debugger.
