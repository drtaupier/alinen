// ======================
// Puerto
// ======================

process.env.PORT = process.env.PORT || 3000; 

// ======================
// Fecha de expiración de token
// ======================

//60 segundos
//60 minutos
//24 hrs
//30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

// ======================
// Seed de autenticación
// ======================

process.env.SEED = 'este-es-el-seed-desarrollo';