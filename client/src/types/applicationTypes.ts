export type ApplicationType = {
    id: number;
    phone: string;
    clientName: string;
    status: boolean;
}

export type ApplicationFormType = Omit<ApplicationType, 'id'>;