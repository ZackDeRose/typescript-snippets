import {Injectable} from "./node_modules/@angular/core";

/* return the global native browser window object */
const getNativeWindow = (): Window => window;

@Injectable()
export class ConsoleHelperService {
    private helpTextList: { [fnName: string]: string };
    private customNamespace: { [fnName: string]: (...args: any[]) => any };

    constructor() {
        this.helpTextList = {};
        this.customNamespace = {};
        (<any>getNativeWindow).custom = this.customNamespace;
        this.registerFunction("help", () => this.help(), "Show this help text");
    }

    get nativeWindow(): Window {
        return getNativeWindow();
    }

    public registerFunction(name: string, fn: (...args: any[]) => any, help?: string): void {
        this.helpTextList[name] = help;
        this.customNamespace[name] = fn;
    }

    private help(): void {
        console.log("Functions defined in the custom namespace namespace:");
        for (const fnName in this.customNamespace) {
            console.log(fnName, ":", this.helpTextList[fnName]);
        }
    }
}
