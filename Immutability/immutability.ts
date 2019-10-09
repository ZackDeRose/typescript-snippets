import { cloneDeep } from './node_modules/lodash';


type Primitive = undefined | null | boolean | string | number | Function;

interface DeepImmutableArray<T> extends ReadonlyArray<Immutable<T>> {}
interface DeepImmutableMap<K, V> extends ReadonlyMap<Immutable<K>, Immutable<V>> {}
export type DeepImmutableObject<T> = {
    readonly [K in keyof T]: Immutable<T[K]>
};

export type Immutable<T> =
    T extends Primitive ? T :
    T extends Array<infer U> ? DeepImmutableArray<U> :
    T extends Map<infer K, infer V> ? DeepImmutableMap<K, V> :
    DeepImmutableObject<T>;

export function clone<K, V>(x: DeepImmutableMap<K, V>): Map<K, V>;
export function clone<T>(x: DeepImmutableArray<T>): T[];
export function clone<T>(x: DeepImmutableObject<T>[keyof T]): T[keyof T];
export function clone<T>(x: DeepImmutableObject<T>): T;

export function clone<T>(x: Immutable<T>): T {
    return <T>cloneDeep(x);
}

const isFreezable = (x: any): boolean => {
    if (typeof x === 'object') {
        return !!x;
    }
    return false;
}

export function freeze<T>(x: T): Immutable<T> {
    if (isFreezable(x)) {
        return Object.freeze(x) as Immutable<T>;
    }
    return x as Immutable<T>;
}
