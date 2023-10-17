import type { MasterType } from './masterTypes';

export type ServiceType = {
  id: number;
  name: string;
  price: number;
  time: number;
  categoryId: number;
};

export type ServicesMastersType = {
  id: number;
  masterId: number;
  serviceId: number;
  Service: ServiceType;
  Master: MasterType;
};

export type ServiceFormType = Omit<ServiceType, 'id'>;
