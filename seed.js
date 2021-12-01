//tạo các dữ liệu gốc
const mongoose = require('mongoose');

const Product = require('./models/product');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopApp');
    console.log("da ket noi ");
}
// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save().then(p => {
//     console.log(p);
// })
//     .catch(e => {
//         console.log(e);
//     })

const a = [{
    name: 'thanh long',
    price: 2.00,
    category: 'fruit'
},
{
    name: 'dua chuot',
    price: 1.00,
    category: 'fruit'
},
{
    name: 'cai cu',
    price: 3.00,
    category: 'fruit'
},
{
    name: 'chuoi',
    price: 2.59,
    category: 'fruit'
},
{
    name: 'bi do',
    price: 3.12,
    category: 'fruit'
},
{
    name: 'tao tau',
    price: 1.99,
    category: 'fruit'
},
]
Product.insertMany(a);