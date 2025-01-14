const sequelize = require('./db');
const express = require('express');
const cors = require('cors')
const eventRoutes = require('./events/routes');
const PORT = process.env.PORT || 3000;
const eventController = require('./events/EventController')
const req = require("express/lib/request");
const Event = require("./events/Event")
const { Op } = require("sequelize");
const app = express ();


app.use(cors());

(async () => {
   try {
      await sequelize.sync();
      await Event.destroy({where: {title: {[Op.not]: null}}});

      console.log('Database synchronized');
   } catch (error) {
      console.error('Błąd podczas synchronizacji bazy danych:', error);
   }
})();

app.use(express.json());
app.use(eventRoutes);

app.listen(PORT, () => {
   console.log("Server Listening on PORT:", PORT);
});