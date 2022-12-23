export class ManagementUser {
    id: string;
    name: string;
    email: string;
    residentId: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class EmployeeDetail {
  id: string;
  employeeUserId: string;
  locationId: string;
  name: string;
  notes: string;
  isAdmin: boolean;
  createDate: Date;
  lastChanged: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class ResidentDetail {
  id: string;
  residentUserId: string;
  locationId: string;
  name: string;
  notes: string;
  createDate: Date;
  lastChanged: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class LocationDetail {
  id: string;
  adminUserId: string;
  name: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
