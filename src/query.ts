type QueryTypesSingle = string | number | boolean;
export type QueryTypesList = string[] | number[] | boolean[];
export type QueryTypes = QueryTypesSingle | QueryTypesList;


export class Query {
  static equal = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, 'equal', value);

  static notEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, 'notEqual', value);

  static lesser = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, 'lesser', value);

  static lesserEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, 'lesserEqual', value);

  static greater = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, 'greater', value);

  static greaterEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, 'greaterEqual', value);

  static search = (attribute: string, value: string): string =>
    Query.addQuery(attribute, 'search', value);

  private static addQuery = (attribute: string, oper: string, value: QueryTypes): string =>
    value instanceof Array
      ? `${attribute}.${oper}(${value
          .map((v: QueryTypesSingle) => Query.parseValues(v))
          .join(',')})`
      : `${attribute}.${oper}(${Query.parseValues(value)})`;

  private static parseValues = (value: QueryTypes): string =>
    typeof value === 'string' || value instanceof String
      ? `"${value}"`
      : `${value}`;
}