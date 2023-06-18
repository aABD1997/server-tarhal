const mongoose = require('mongoose')

function resetMongos_id(){
    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
          delete converted._id;
          delete converted.__v;
        }
      });
}

 module.exports = resetMongos_id