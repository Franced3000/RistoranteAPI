import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config';
import Table from './tavolo';
import Customer from './cliente';

// Class definition using Model with type inference
class Reservation extends Model<InferAttributes<Reservation>, InferCreationAttributes<Reservation>> {
  declare id: CreationOptional<number>;
  declare numeroTavolo: number;
  declare idCliente: number;
  declare dateTime: Date;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
  declare deletedAt?: CreationOptional<Date>;
}

// Initialize the model
Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroTavolo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    idCliente: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'reservations',
    paranoid: true,
  }
);

export default Reservation;
