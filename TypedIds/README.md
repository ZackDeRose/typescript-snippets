# Typed Id's

### Problem
In most projects Id's are used to identify entities. If this is done with plain strings, the TypeScript compiler can't differentiate between a UserId and an OrderId for example.

### Solution
Provide an interface which wraps the String type to give the TypeScript compiler the ability to help the developer while handling Id's.

### Example

Create a new userId
```typescript
const userId = asUserId("0279d755-0dff-4847-b591-7c99ec473d8e");
```
Proper typing of functions
```typescript
public getUserById(userId: TUserId): IUser {
    return this.users.find(user => user.id === userId);
}
```

To use a UserId as a string we need to convert it back to a string
```typescript
const userIdString = userId.toString();
```

### Benefit
Secure handling of Id's, better code completion, less errors.
