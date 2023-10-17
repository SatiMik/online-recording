export type OnlineRecordType = {
  id: number;
  time: number;
  serviceId: number;
  masterId: number;
  userId: number;
};

export type OnlineRecordFormType = Omit<OnlineRecordType, 'id'>;
