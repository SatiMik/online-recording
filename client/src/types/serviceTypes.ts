export type ServiceType = {
  id: number;
  name: string;
  price: number;
  time: number;
  categoryId: number;
};

export type ServiceFormType = Omit<ServiceType, 'id'>;
