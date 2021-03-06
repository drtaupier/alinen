const jwt = require('jsonwebtoken');

//=========Verifica Token============

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    });
}

//=========Verifica AdminRole============

let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        res.json({
            ok:false,
            err:{
                message: 'El usuario no es Administrador'
            }
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdminRole
}