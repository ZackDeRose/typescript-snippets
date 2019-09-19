/*
Interface which just extends the String type to provide a proper Id typing.
Since empty interfaces are not allowed and we don't need the __user_id, never is being used.
*/
export interface TUserId extends String {
    __user_id: never;
}

/*
Convert a normal String to a UserId.
*/
export const asUserId = (s: any): TUserId => <any>s;
