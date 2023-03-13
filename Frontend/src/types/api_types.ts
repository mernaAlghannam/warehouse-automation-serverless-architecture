/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

/**
 * This represents a row in table desplaying student information, their grades, and the class they are in
 */
export interface IShipperData {
  ShipperID: string,
  BoxesRcvd: string;
  Date: string;
  ShipmentID: string,
  ShippingPO: string;
  WarehouseID: string;
}
