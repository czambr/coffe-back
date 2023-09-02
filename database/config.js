// ------------------------------------------------
//   ===> Librerias
// ------------------------------------------------
const mongoose = require('mongoose');

const dbConennction = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_CNN);
      console.log('Database Online!');
   } catch (error) {
      console.log(error);
      throw new Error('Error al iniciar la base de datos');
   }
};

module.exports = {
   dbConennction,
};
