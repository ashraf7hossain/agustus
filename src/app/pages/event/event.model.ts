export class EventObject {
  
    id: string;
    employeeUserId: string;
    locationId:  string;
    locationName: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    latitude: number;
    longitude: number;
    eventStatus: number;
    defaultRate: number;
    coverImageId: string;
    flyerImageId: string;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }
  