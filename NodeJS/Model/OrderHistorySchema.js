import mongoose from 'mongoose';
const orderHistorySchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true },
    items:[{
        productId : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: { type: Number, default: 1 },
        date: { type: Date, default: Date.now }
    }]
});

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
export default OrderHistory;