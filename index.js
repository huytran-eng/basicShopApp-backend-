
const express = require('express');
const app = express();//set up express
const path = require('path');
const methodOverride = require('method-override');//method-override cho put và patch mongoose
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));

const mongoose = require('mongoose');

const Product = require('./models/product');

const categories = ['fruit', 'vegetable', 'dairy'];

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopApp');
    console.log("da ket noi ");
}//hàm kết nối mongoose


//tạo một sản phẩm mới
app.get('/products/new', (req, res) => {
    res.render('new', { categories });
})

//đăng,lưu sản phẩm đã tạo lên cơ sở dữ liệu
app.post('/products', async (req, res) => {
    const NewProduct = new Product(req.body);
    await NewProduct.save();
    res.redirect(`/products/${NewProduct._id}`)
})

//tìm sản phẩm
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('showProduct', { product, categories });
})

//chọn sản phẩm và thay đổi
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product, categories });
})
//lưu sản phẩm vừa thay đổi
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`)
})

//trang chủ
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('home', { products });
})


//xóa sản phẩm
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.listen(3000, () => {
    console.log('OKE');
})






