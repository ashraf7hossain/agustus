export class MaintenanceObject {
  id: string;
  name: string;
  description: string;
  status: string;
  permission: string;
  priority: string;
  unit: number;
  issueDate: Date;
  imageId: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
export class MaintenanceComment {
  id: string;
  maintenanceId: string;
  creatorId: string;
  messageBody: string;
  creatorName: string;
  createDate: Date;
  lastChanged: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}