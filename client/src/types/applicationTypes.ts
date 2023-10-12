export type ApplicationType = {
    id: number;
    clientName: string;
    phone: string;
}

export type ApplicationFormType = Omit<ApplicationType, 'id'>;