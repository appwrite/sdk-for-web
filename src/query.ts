type QueryTypesSingle = string | number | boolean;
export type QueryTypesList = string[] | number[] | boolean[] | Query[];
export type QueryTypes = QueryTypesSingle | QueryTypesList;
type AttributesTypes = string | string[];

/**
 * Helper class to generate query strings.
 */
export class Query {
  method: string;
  attribute: AttributesTypes | undefined;
  values: QueryTypesList | undefined;

  /**
   * Constructor for Query class.
   *
   * @param {string} method
   * @param {AttributesTypes} attribute
   * @param {QueryTypes} values
   */
  constructor(
    method: string,
    attribute?: AttributesTypes,
    values?: QueryTypes
  ) {
    this.method = method;
    this.attribute = attribute;

    if (values !== undefined) {
      if (Array.isArray(values)) {
        this.values = values;
      } else {
        this.values = [values] as QueryTypesList;
      }
    }
  }

  /**
   * Convert the query object to a JSON string.
   *
   * @returns {string}
   */
  toString(): string {
    return JSON.stringify({
      method: this.method,
      attribute: this.attribute,
      values: this.values,
    });
  }

  /**
   * Filter resources where attribute is equal to value.
   *
   * @param {string} attribute
   * @param {QueryTypes} value
   * @returns {string}
   */
  static equal = (attribute: string, value: QueryTypes): string =>
    new Query("equal", attribute, value).toString();

  /**
   * Filter resources where attribute is not equal to value.
   *
   * @param {string} attribute
   * @param {QueryTypes} value
   * @returns {string}
   */
  static notEqual = (attribute: string, value: QueryTypes): string =>
    new Query("notEqual", attribute, value).toString();

  /**
   * Filter resources where attribute is less than value.
   *
   * @param {string} attribute
   * @param {QueryTypes} value
   * @returns {string}
   */
  static lessThan = (attribute: string, value: QueryTypes): string =>
    new Query("lessThan", attribute, value).toString();

  /**
   * Filter resources where attribute is less than or equal to value.
   *
   * @param {string} attribute
   * @param {QueryTypes} value
   * @returns {string}
   */
  static lessThanEqual = (attribute: string, value: QueryTypes): string =>
    new Query("lessThanEqual", attribute, value).toString();

  /**
   * Filter resources where attribute is greater than value.
   *
   * @param {string} attribute
   * @param {QueryTypes} value
   * @returns {string}
   */
  static greaterThan = (attribute: string, value: QueryTypes): string =>
    new Query("greaterThan", attribute, value).toString();

  /**
   * Filter resources where attribute is greater than or equal to value.
   *
   * @param {string} attribute
   * @param {QueryTypes} value
   * @returns {string}
   */
  static greaterThanEqual = (attribute: string, value: QueryTypes): string =>
    new Query("greaterThanEqual", attribute, value).toString();

  /**
   * Filter resources where attribute is null.
   *
   * @param {string} attribute
   * @returns {string}
   */
  static isNull = (attribute: string): string =>
    new Query("isNull", attribute).toString();

  /**
   * Filter resources where attribute is not null.
   *
   * @param {string} attribute
   * @returns {string}
   */
  static isNotNull = (attribute: string): string =>
    new Query("isNotNull", attribute).toString();

  /**
   * Filter resources where attribute is between start and end (inclusive).
   *
   * @param {string} attribute
   * @param {string | number} start
   * @param {string | number} end
   * @returns {string}
   */
  static between = (attribute: string, start: string | number, end: string | number): string =>
    new Query("between", attribute, [start, end] as QueryTypesList).toString();

  /**
   * Filter resources where attribute starts with value.
   *
   * @param {string} attribute
   * @param {string} value
   * @returns {string}
   */
  static startsWith = (attribute: string, value: string): string =>
    new Query("startsWith", attribute, value).toString();

  /**
   * Filter resources where attribute ends with value.
   *
   * @param {string} attribute
   * @param {string} value
   * @returns {string}
   */
  static endsWith = (attribute: string, value: string): string =>
    new Query("endsWith", attribute, value).toString();

  /**
   * Specify which attributes should be returned by the API call.
   *
   * @param {string[]} attributes
   * @returns {string}
   */
  static select = (attributes: string[]): string =>
    new Query("select", undefined, attributes).toString();

  /**
   * Filter resources by searching attribute for value.
   * A fulltext index on attribute is required for this query to work.
   *
   * @param {string} attribute
   * @param {string} value
   * @returns {string}
   */
  static search = (attribute: string, value: string): string =>
    new Query("search", attribute, value).toString();

  /**
   * Sort results by attribute descending.
   *
   * @param {string} attribute
   * @returns {string}
   */
  static orderDesc = (attribute: string): string =>
    new Query("orderDesc", attribute).toString();

  /**
   * Sort results by attribute ascending.
   *
   * @param {string} attribute
   * @returns {string}
   */
  static orderAsc = (attribute: string): string =>
    new Query("orderAsc", attribute).toString();

  /**
   * Return results after documentId.
   *
   * @param {string} documentId
   * @returns {string}
   */
  static cursorAfter = (documentId: string): string =>
    new Query("cursorAfter", undefined, documentId).toString();

  /**
   * Return results before documentId.
   *
   * @param {string} documentId
   * @returns {string}
   */
  static cursorBefore = (documentId: string): string =>
    new Query("cursorBefore", undefined, documentId).toString();

  /**
   * Return only limit results.
   *
   * @param {number} limit
   * @returns {string}
   */
  static limit = (limit: number): string =>
    new Query("limit", undefined, limit).toString();

  /**
   * Filter resources by skipping the first offset results.
   *
   * @param {number} offset
   * @returns {string}
   */
  static offset = (offset: number): string =>
    new Query("offset", undefined, offset).toString();

  /**
   * Filter resources where attribute contains the specified value.
   *
   * @param {string} attribute
   * @param {string | string[]} value
   * @returns {string}
   */
  static contains = (attribute: string, value: string | string[]): string =>
    new Query("contains", attribute, value).toString();

  /**
   * Combine multiple queries using logical OR operator.
   *
   * @param {string[]} queries
   * @returns {string}
   */
  static or = (queries: string[]) =>
    new Query("or", undefined, queries.map((query) => JSON.parse(query))).toString();

  /**
   * Combine multiple queries using logical AND operator.
   *
   * @param {string[]} queries
   * @returns {string}
   */
  static and = (queries: string[]) =>
    new Query("and", undefined, queries.map((query) => JSON.parse(query))).toString();
}
