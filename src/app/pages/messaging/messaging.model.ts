export class MessagingGroup {
  id: string;
  name: string;
  isActive: boolean;
  otherUsers: OtherMessageUsers;
  createDate: Date;
  lastChanged: Date;

  selected: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class OtherMessageUsers {
  name: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class Messages {
  id: string;
  messageGroupId: string;
  creatorId: string;
  messageBody: string;
  creatorName: string;
  createDate: Date;
  lastChanged: Date;

  selected: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class MessageUsers {
  resident: ResidentDetail;
  employees: EmployeeDetail;

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
