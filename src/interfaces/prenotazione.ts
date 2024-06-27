export interface ReservationAttributes {
    id: number;
    tableId: number;
    customerId: number;
    dateTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }