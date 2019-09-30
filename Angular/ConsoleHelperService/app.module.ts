import { windowFactory } from "./window.factory";

providers: [
    { provide: 'window', useFactory: windowFactory }
]