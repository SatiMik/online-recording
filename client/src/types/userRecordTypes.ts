import type { MasterType } from './masterTypes';
import type { ServiceType } from './serviceTypes';

export type UserRecordType = {
  id: number;
  date: number;
  time: number;
  serviceId: number;
  masterId: number;
  userId: number;
  Master: MasterType;
  Service: ServiceType;
};
