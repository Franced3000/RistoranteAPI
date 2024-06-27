export interface CustomerAttributes {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }