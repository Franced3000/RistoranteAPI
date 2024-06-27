// db/sync.ts

import sequelize from './config';
import Table from './models/tavolo';
import Customer from './models/cliente';
import Reservation from './models/prenotazione';

// Un tavolo può avere molte prenotazioni
Table.hasMany(Reservation, {
    foreignKey: 'numeroTavolo'
  });
  
  // Un cliente può avere molte prenotazioni
  Customer.hasMany(Reservation, {
    foreignKey: 'idCliente'
  });
  
  // Una prenotazione appartiene ad un tavolo
  Reservation.belongsTo(Table, {
    foreignKey: 'numeroTavolo'
  });
  
  // Una prenotazione appartiene ad un cliente
  Reservation.belongsTo(Customer, {
    foreignKey: 'idCliente'
  });
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Utilizzare { force: false } per non sovrascrivere le tabelle esistenti
    console.log('Database sincronizzato con successo');
  } catch (error) {
    console.error('Impossibile sincronizzare Database:', error);
  }
};

syncDatabase();

export default syncDatabase;
