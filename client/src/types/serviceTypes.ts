export type CategoryType = {
  id: number;
  name: string;
};

export type ServiceType = {
  id: number;
  name: string;
  price: number;
  time: number;
  categoryId: number;
 

};

export type ServiceFormType = Omit<ServiceType, 'id'>;
