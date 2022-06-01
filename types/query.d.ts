declare type QueryTypesSingle = string | number | boolean;
export declare type QueryTypesList = string[] | number[] | boolean[];
export declare type QueryTypes = QueryTypesSingle | QueryTypesList;
export declare class Query {
    static equal: (attribute: string, value: QueryTypes) => string;
    static notEqual: (attribute: string, value: QueryTypes) => string;
    static lesser: (attribute: string, value: QueryTypes) => string;
    static lesserEqual: (attribute: string, value: QueryTypes) => string;
    static greater: (attribute: string, value: QueryTypes) => string;
    static greaterEqual: (attribute: string, value: QueryTypes) => string;
    static search: (attribute: string, value: string) => string;
    private static addQuery;
    private static parseValues;
}
export {};
