export type ApplicationType = {
    id: number;
    phone: string;
    clientName: string;
}

export type ApplicationFormType = Omit<ApplicationType, 'id'>;