import { Injectable } from '@angular/core';


@Injectable()
export class ConsoleHelperService {
    private helpTextList: { [fnName: string]: string };
    private customNamespace: { [fnName: string]: (...args: any[]) => any };

    constructor(@Inject('window') window: Window) {
        this.helpTextList = {};
        this.customNamespace = {};
        (<any>window).custom = this.customNamespace;
        this.registerFunction('help', () => this.help(), 'Show this help text');
    }

    public registerFunction(name: string, fn: (...args: any[]) => any, help?: string): void {
        this.helpTextList[name] = help;
        this.customNamespace[name] = fn;
    }

    private help(): void {
        console.log('Functions defined in the custom namespace namespace:');
        for (const fnName in this.customNamespace) {
            console.log(fnName, ':', this.helpTextList[fnName]);
        }
    }
}
