export type SaleType = {
  id: number;
  img: string;
  description: string;
};

export type SaleFormType = Omit<SaleType, 'id'>;
export type SaleTitalType = Omit<SaleType, 'id' | 'img'>;
