export type MasterServiceType = {
    id: number,
    serviceId: number,
    masterId: number
}

export type MasterServiceFormType = Omit<MasterServiceType, 'id'>;