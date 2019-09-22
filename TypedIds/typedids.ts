/*
Interface which just extends the String type to provide a proper Id typing.
Since in TypeScript an empty interface will be the same as another empty interface, you need a property which is unique to it. 
But we don't need the __user_id, so never is being used.
*/
export interface TUserId extends String {
    __user_id: never;
}

/*
Convert a normal String to a UserId.
*/
export const asUserId = (s: String): TUserId => <any>s;
