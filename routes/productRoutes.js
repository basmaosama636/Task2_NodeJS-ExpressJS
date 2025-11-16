const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}
router.get('/', isAuthenticated, productController.index);
router.get('/new', isAuthenticated, productController.showNewForm);
router.post('/', isAuthenticated, productController.create);
router.get('/:id', isAuthenticated, productController.show);
router.get('/:id/edit', isAuthenticated, productController.showEditForm);
router.put('/:id', isAuthenticated, productController.update);
router.delete('/:id', isAuthenticated, productController.delete);

module.exports = router;
