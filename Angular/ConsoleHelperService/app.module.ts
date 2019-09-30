import { windowFactory } from "./window.factory";
import { ConsoleHelperService } from "./console.service";

providers: [
    { provide: 'window', useFactory: windowFactory },
    ConsoleHelperService,
]