const express = require('express') ;

const morgan = require('morgan') ;

const cors = require('cors') ;

const app = express() ;

const mongoose = require( './database') ;

const Usuario = require("./models/usuario");
const bcrypt = require("bcryptjs");

async function crearAdmin() {
  try {
    const adminEmail = "admin@admin.com";
    const existe = await Usuario.findOne({ email: adminEmail });

    if (existe) {
      console.log("usuario admin ya existe");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin", 10);

    const admin = new Usuario({
      name: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      office: "Ofc 1",
      position: "admin",
      salary: 0
    });

    await admin.save();

    console.log("usuario admin creado");

  } catch (error) {
    console.error("Error creando admin:", error);
  }
}

crearAdmin();


app.set('port', process.env .PORT || 3000);

app .use(morgan('dev'));

app .use(express.json());

app.use(cors({origin: 'http://localhost:3001'}));

// rutas de nuestro servidor

app .use('/api/app_web/usuarios',require('./routes/usuario.routes'));
app .use('/api/app_web/productos',require('./routes/producto.routes'));
app .use('/api/app_web/servicios',require('./routes/servicio.routes'));

// Iniciando el servidor

app.listen(app.get('port'), () => {

    console.log('server activo en el puerto', app.get('port'));

});