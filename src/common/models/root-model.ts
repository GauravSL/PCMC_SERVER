/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * This is root model class used to wrap amadeus API
 */
export interface RootModel<Type> {
  warning?: Warning;
  data: Type;
  dictionary?: Dictionary;
}
export interface Warning {}
export interface Dictionary {}
