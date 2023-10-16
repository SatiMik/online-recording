export type MasterType = {
  id: number;
  name: string;
  desc: string;
  img: string;
};

export type MasterFormType = Omit<MasterType, 'id'>;

export type MasterWorkType = {
  id: number;
  image: string;
  masterId: number;
};

