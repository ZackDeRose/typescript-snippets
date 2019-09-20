# Immutability Helper

### Problem
Since JavaScript is a language which can have a lot of places where an object is manipulated, you sometimes don't know why an object doesn't have the values you expected. Unfortunately the readonly property of TypeScript is only shallow, which means nested objects or arrays can still be manipulated.

### Solution
We introduced an immutable type, which provides deep immutability.

### Example
Instanciate a primitive type
```
const immutString: Immutable<string> = "test";
```
Or a nested object
```
const user: Immutable<IUser> = {
    id: asUserId("0279d755-0dff-4847-b591-7c99ec473d8e"), // See TypedId's
    options: {
        language: 'en',
        ...
    }
    ...
};

user.options.language = 'de'; // Error: Cannot assign to 'language' because it is a read-only property.
```
Or as a return type
```
public getUserById(userId: TUserId): Immutable<IUser> {
    return this.users.find(user => user.id === userId);
}
```

### Benefit
More controlled way of handling mutability. Decreased errors because of unexpected mutations.
