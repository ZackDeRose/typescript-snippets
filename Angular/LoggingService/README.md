# Logging Decorator

### Problem
If you want to steer your application logs more, you need a logging service. If a lot of components and services produce logs, a context and topic can be helpful to understand the logs later. Additionally you don't want overhead in your application.

### Solution
A logging decorator which can be attached to each component and will be instanciated with its context and topic.

### Example

Create a Logger class
```typescript
export class LoggingService {
    constructor(
        private loggingContext: string,
        private defaultLogTopic: LOG_TOPIC,
    ) {}
```
The log function will be called with the log level and the messages
```typescript
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
```
Function to build the string and decide which console function will be called
```typescript
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
```
Public functions which you steer the log level with
```typescript
public info(...messages: any[]): void {
    this.log(LOG_LEVEL.INFO, messages);
}

public error(...messages: any[]): void {
    this.log(LOG_LEVEL.ERROR, messages);
}

public debug(...messages: any[]): void {
    this.log(LOG_LEVEL.DEBUG, messages);
}
```
```typescript
private isLogTopic(message: any): boolean {
    return Object.keys(LOG_TOPIC).includes(message);
}
```

A logger function will be exported to use it as a decorator
```typescript
export function logger(context: string = '', topic: LOG_TOPIC = LOG_TOPIC.UNKNOWN): (target: any, key: string) => void {
    return (target: any, key: string) => {
        target[key] = new Logger(context, topic);
    };
}
```

### Use of the Logger Decorator

The logger can now be added to components with the given context and topic.
```typescript
@logger("UserService", LOG_TOPIC.LOGIN)
private log: ILogger;
```
Clean and easy log statement
```typescript
this.log.info("Successfully logged in");
```

### Benefit
A quick and easy way to handle different log contexts and topics. Increased readability of the code and the resulting logs. The LoggingService can easily be extended by a functionality to send data to the backend.
