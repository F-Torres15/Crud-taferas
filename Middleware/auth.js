const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, 'segredo123');
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};
