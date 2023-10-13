export type CategoryType = {
    id: number;
    name: string;
    
  };

export type CategoryFormType = Omit<CategoryType, 'id'>;
