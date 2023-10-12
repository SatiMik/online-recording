export type MasterType = {
  id: number;
  name: string;
  desc: string;
  img: string;
};

export type MasterFormType = Omit<MasterType, 'id'>;