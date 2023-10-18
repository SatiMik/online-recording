export type RecordType = {
  id: number;
  date: number;
  time: number;
  service: string;
  master: string | null;
  user: string;
  phone: string;
};

export type RecordFromBackType = {
  status: number;
  statusFree: number;
  time: number;
  master: {
    id: number;
    name: string;
  };
  record: {
    id: number;
    date: number;
    time: number;
    User: {
      id: number;
      name: string;
      phone: string;
    };
    Service: {
      id: number;
      name: string;
      price: string;
      time: number;
    };
    Master: {
      id: number;
      name: string;
    };
  } | null;
};

export type RecordsFromBackType = {
  master: {
    id: number;
    name: string;
  };
  records: RecordFromBackType[];
};


export type RecordFormType = Omit<RecordType, 'id'>;
