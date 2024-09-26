const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, // For authentication or verification
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  doorNumber: { type: String, required: true },
  books: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      quantity: { type: Number, required: true }
    }
  ],
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema); //  mongoose.model(collection_name  , schema name)  note : here Order collection display as orders in mongodb database i.e convert it into lowercase and plural 

module.exports = Order;

