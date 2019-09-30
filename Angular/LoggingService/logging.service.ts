/* tslint:disable:no-console */

import {isString} from 'lodash';
import {ConsoleHelperService} from '../ConsoleHelperService/console.service';


export enum LOG_LEVEL {
    INFO = 'INFO',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
}

export enum LOG_TOPIC {
    UNKNOWN = 'UNKNOWN',
    DEBUG = 'DEBUG',
    USERSERVICE = 'USERSERVICE',
}

export interface ILogger {
    info(...messages: any[]): void;
    error(...messages: any[]): void;
    debug(...messages: any[]): void;
}

interface ILoggerContext {
    logToConsole: boolean;
}

export const LOGGER_CONTEXT: ILoggerContext = {
    logToConsole: false,
};

export function setupConsoleLoggingHelper(consoleHelperService: ConsoleHelperService): void {
    consoleHelperService.registerFunction('enableLogging', () => {
        LOGGER_CONTEXT.logToConsole = true;
    });
}

export class Logger implements ILogger {
    constructor(
        private loggingContext: string,
        private defaultLogTopic: LOG_TOPIC,
    ) {}

    private log(level: LOG_LEVEL, messages: any[]): void {
        let logTopic: LOG_TOPIC = this.defaultLogTopic;
        if (
            Array.isArray(messages) &&
            (messages.length > 1) &&
            this.isLogTopic(messages[messages.length - 1])
        ) {
            logTopic = messages.pop();
        }
        if (LOGGER_CONTEXT.logToConsole) {
            this.logToConsole(level, logTopic, messages);
        }
    }

    private logToConsole(level: LOG_LEVEL, logTopic: LOG_TOPIC, messages: any[]): void {
        let l: string[];
        if ((messages.length === 1) && isString(messages[0])) {
            l = ['[' + this.loggingContext + ':' + logTopic + '] ' + level + ': ' + messages[0]];
        } else {
            l = ['[' + this.loggingContext + ':' + logTopic + '] ' + level + ': ', ...messages];
        }
        switch (level) {
            case LOG_LEVEL.DEBUG:
                console.log(...l);
                break;
            case LOG_LEVEL.INFO:
                console.info(...l);
                break;
            case LOG_LEVEL.ERROR:
                console.error(...l);
                break;
        }
    }

    public info(...messages: any[]): void {
        this.log(LOG_LEVEL.INFO, messages);
    }

    public error(...messages: any[]): void {
        this.log(LOG_LEVEL.ERROR, messages);
    }

    public debug(...messages: any[]): void {
        this.log(LOG_LEVEL.DEBUG, messages);
    }

    private isLogTopic(message: any): boolean {
        return Object.keys(LOG_TOPIC).includes(message);
    }
}

export function logger(context: string = '', topic: LOG_TOPIC = LOG_TOPIC.UNKNOWN): (target: any, key: string) => void {
    return (target: any, key: string) => {
        target[key] = new Logger(context, topic);
    };
}
