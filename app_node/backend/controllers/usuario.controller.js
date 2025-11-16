const Usuario = require('../models/usuario');

const usuarioCtrl = {};

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


/**

* DEFINO LOS MÉTODOS */

//Obtener todos los usuarios

usuarioCtrl.getUsuarios = async (req, res) => {

const usuarios = await Usuario.find();

res.json(usuarios);

}

// Registrar usuarios 
usuarioCtrl.register = async (req, res) => {
    try {
      const { nombre, position, office, salary, email, password } = req.body;

      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) return res.status(400).json({ message: 'Email ya registrado' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const nuevoUsuario = new Usuario({ nombre, position, office, salary, email, password: hashedPassword });
      await nuevoUsuario.save();

      res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Login de usuario
usuarioCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({email});

    if (!usuario) return res.status(400).json({message: 'Usuario no registrado'});

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(401).json({message: 'Contraseña incorrecta'});

    // Generar token JWT
    const token = jwt.sign(
      {id: usuario._id, email: usuario.email},
      'clave_por_defecto_segura',
      {expiresIn: '2h'}
    );

    res.json({message: 'Ingreso exitoso', token});
  } catch (error) {
    res.status(500).json({message: 'Error al iniciar sesión', error});
  }
};


//Conseguir un único usuario
usuarioCtrl.getUnicoUsuario = async (req, res) => {

const usuarioUnico = await Usuario.findById(req.params.id);

res.json(usuarioUnico);

}

//Actualizar usuario
usuarioCtrl.editarUsuario = async (req, res) => {

const { id } = req.params;

const emepleadoEdit = {

nombre: req.body.nombre,

position: req.body.position,

office: req.body.office,

salary: req.body.salary

};

await Usuario.findByIdAndUpdate(id, {$set: emepleadoEdit}, {new: true});

res.json({status: 'Usuario Actualizado'});

}

// Eliminar usuario
usuarioCtrl.eliminarUsuario = async (req, res) => {

await Usuario.findByIdAndDelete(req.params.id);

res.json({status: 'Usuario Eliminado'});

}

//exporto el módulo

module.exports = usuarioCtrl;

