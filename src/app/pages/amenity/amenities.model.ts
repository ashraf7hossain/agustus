export class AmenityObject {
  id: string;
  locationId: string;
  name: string;
  primaryImageId: string;
  canReserve: boolean;
  maxGuests: number;
  weekdays: string;
  openTime: Date;
  closeTime: Date;
  createDate: Date;
  lastChanged: Date;
  price: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
