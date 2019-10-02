# Assert Unreachable

### Problem
Sometimes its hard to track if you covered every case in a conditional statement.

### Solution
A function that helps to make sure you've really covered every case. AssertUnreachable can be used as the default case for example. This case is then never allowed to happen and the TypeScript Compiler can help you to ensure that.


### Example

With the function
```typescript
export function assertUnreachable(x: never): never {
    throw new Error("assertUnreachable:" + x);
}
```

we can make sure that every case is handled
```typescript
enum EXPORT_STATUS {
    PENDING = "PENDING",
    FAILED = "FAILED",
    SUCCESSFUL = "SUCCESSFUL",
}

switch (status) {
    case EXPORT_STATUS.PENDING:
        this.loadingIcon = ICON.PENDING;
        break;
    case EXPORT_STATUS.FAILED:
        this.loadingIcon = ICON.FAILED;
        break;
    case EXPORT_STATUS.SUCCESSFUL:
        this.loadingIcon = ICON.SUCCESSFUL;
        break;
    default:
        assertUnreachable(status);
}
```

If you forget a case or add a new one, you will now get an error.
```typescript
switch (status) {
    case EXPORT_STATUS.PENDING:
        this.loadingIcon = ICON.PENDING;
        break;
    case EXPORT_STATUS.FAILED:
        this.loadingIcon = ICON.FAILED;
        break;
    default:
        assertUnreachable(status); // Error: Argument of type 'EXPORT_STATUS.SUCCESSFUL' is not assignable to parameter of type 'never'.
}
```

### Benefit
Easy extensibility of complex switch statements. More confidence and safe code.