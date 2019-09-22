# (DRAFT) Typed Templates

`!!! This is only a draft and not complete yet !!!`

### Problem
With nested objects it's sometimes hard to keep track if all properties align if they need to.

### Solution
If we use an interface which links those properties, the TypeScript Compiler can check if they match in usage.

### Example
First declare an type enum with every configuration
```typescript
export enum CONFIG_TYPE {
    CHART = "CHART",
    TABLE = "TABLE"
}
```
Then declare the different templates
```typescript
export interface ITemplate {
}

export interface ITemplateChart extends ITemplate {
    hideLegend: boolean,
    ...
}

export interface ITemplateTable extends ITemplate {
    showHeader: boolean,
    ...
}
```
A generic configuration interface will now help to link the type to the template
```typescript
interface IGenericConfig<T extends ITemplate = ITemplate, C extends CONFIG_TYPE = CONFIG_TYPE> {
    configType: C;
    template?: T;
    ...
}
```
Establishing the link
```typescript
export interface IConfigChart extends IGenericConfig<ITemplateChart, CONFIG_TYPE.CHART> {}
export interface IConfigTable extends IGenericConfig<ITemplateTable, CONFIG_TYPE.TABLE> {}
```
A union of those configuration interfaces now provides our config type.
```typescript
export type IConfig = IConfigChart | IConfigChart;
```
If we use this link now, this will be ok
```typescript
const MY_TEMPLATE: IConfig = {
    configType: CONFIG_TYPE.CHART,
    template: {
        hideLegend: true, /* Ok */
    }
}
```
But the TypeScript Compiler is now able to find an error in this
```typescript
const MY_TEMPLATE: IConfig = {
    configType: CONFIG_TYPE.CHART,
    template: {
        showHeader: true, /* Error: Object literal may only specify known properties, and 'showHeader' does not exist in type 'ITemplateChart'. */
    }
}
```

### Benefit
Because of the link between config and template, the TypeScript Compiler is now able to check if our nested objects match our declaration. We found a lot of wrong attributes in our objects and development is much easier due to correct code completion now.
