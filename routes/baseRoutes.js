const express = require('express');

function baseRoutes(controller) {
  const router = express.Router();

  // GET all
  router.get('/', controller.getAll);

  // GET by ID
  router.get('/:id', controller.getById);

  // POST create
  router.post('/', controller.create);

  // PUT update
  router.put('/:id', controller.updateById);

  // DELETE
  router.delete('/:id', controller.deleteById);

  return router;
}

module.exports = baseRoutes;