type QueryTypes = string | string[] | number | number[] | boolean | boolean[];
type QueryTypesList = string[] | number[] | boolean[];

class Query {
  static equal = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "equal", value);

  static notEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "notEqual", value);

  static lesser = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "lesser", value);

  static lesserEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "lesserEqual", value);

  static greater = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "greater", value);

  static greaterEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "greaterEqual", value);

  static contains = (attribute: string, value: QueryTypesList): string =>
    Query.addQuery(attribute, "contains", value);

  static search = (attribute: string, value: string): string =>
    Query.addQuery(attribute, "search", value);

  private static addQuery = (attribute: string, oper: string, value: unknown): string =>
    value instanceof Array
      ? `${attribute}.${oper}(${value
          .map((v) => Query.parseValues(v))
          .join(",")})`
      : `${attribute}.${oper}(${Query.parseValues(value)})`;

  private static parseValues = (value: unknown): string =>
    typeof value === "string" || value instanceof String
      ? `"${value}"`
      : `${value}`;
}
