const error = require('restify-errors');
const Item = require('../models/Item');

module.exports = server => {
    // Get Items
    server.get('/items', async (req, res, next) => {
        // res.send({msg: 'test'});
        try {
            const items = await Item.find({});
            res.send(items);
            next();      
        } catch (error) {
            return next(new errors.InvalidContentError(err));
        }
        next();
    });

    //Get Single Items
    server.get('/items/:id', async (req, res, next) => {
        try {
            const item = await Item.findById(req.params.id);
            res.send(item);
            next();
        } catch (error) {
            return next(
            new errors.ResourceNotFoundError(
                `There is no customer with the id of ${req.params.id}`
            )
            );
        }
    })

    // Add Items
    server.post('/items', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Excepts 'application/json'"));
        }

        const { name, type, price } = req.body;

        const item = new Item({
            name,
            type,
            price
        });

        try{
            const newItem = await item.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    // // Update Items
    // server.put('/items/:id', async (req, res, next) => {
    //     if(!req.is('application/json')){
    //         return next(new errors.InvalidContentError("Excepts 'application/json'"));
    //     }

    //     try {
    //         const item = await Item.findOneandUpdate(
    //             { _id: req.params.id },
    //             req.body
    //         );
    //         res.send(200);
    //         next();
    //     } catch (error) {
    //         return next(new errors.ResourceNotFoundError(
    //             `There is no customer with the id of ${req.params.id}`
    //         )
    //         );
    //     }
    // });

      // Update Customer
  server.put(
    '/customers/:id',
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      try {
        const item = await Item.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.send(200);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no item with the id of ${req.params.id}`
          )
        );
      }
    }
  );

  // Delete item
  server.del(
    '/items/:id',
    async (req, res, next) => {
      try {
        const item = await Item.findOneAndRemove({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no customer with the id of ${req.params.id}`
          )
        );
      }
    }
  );
    
};