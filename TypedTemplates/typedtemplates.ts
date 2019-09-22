export enum CONFIG_TYPE {
    CHART = "CHART",
    TABLE = "TABLE"
}

export interface ITemplate {
}

export interface ITemplateChart extends ITemplate {
    hideLegend: boolean,
}

export interface ITemplateTable extends ITemplate {
    showHeader: boolean,
}

interface IGenericConfig<T extends ITemplate = ITemplate, C extends CONFIG_TYPE = CONFIG_TYPE> {
    configType: C;
    template?: T;
}

export interface IConfigChart extends IGenericConfig<ITemplateChart, CONFIG_TYPE.CHART> {}
export interface IConfigTable extends IGenericConfig<ITemplateTable, CONFIG_TYPE.TABLE> {}

export type IConfig = IConfigChart | IConfigChart;

const MY_TEMPLATE: IConfig = {
    configType: CONFIG_TYPE.CHART,
    template: {
        hideLegend: true,
    }
}