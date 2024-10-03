let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors())


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shop');

let clothSchema = new mongoose.Schema({
    type: String,
    brand: String,
    model: String,
    price: Number,
    size: String,
    sex: String,
    img: String,
    country: String
}, {
    timestamps: true
});

let Clothes = mongoose.model('Clothes', clothSchema);



app.get(`/clothes`, async function (req, res) {
    let searchQuery = req.query.search || '';  
    let sort = req.query.sort;
    let type = req.query.type;
    let sex = req.query.sex;
    let country = req.query.country;

    let search = {};

    if (searchQuery) {
        search = {
            $or: [
                { type: new RegExp(searchQuery, 'i') },  
                { brand: new RegExp(searchQuery, 'i') }, 
                { model: new RegExp(searchQuery, 'i') }  
            ]
        };
        if (req.query.type) search.type = req.query.type;
        if (req.query.brand) search.brand = req.query.brand;
        if (req.query.model) search.model = req.query.model;
        if (req.query.sex) search.sex = req.query.sex;
        if (req.query.country) search.country = req.query.country;
    }

    if (type) {
        search.type = type;  
    }
    if (sex) {
        search.sex = sex;   
    }
    if (country) {
        search.country = country;  
    }

    let sorting = {};
    if (sort === '-1') {
        sorting.price = -1;  
    }
    if (sort === '1') {
        sorting.price = 1;   
    }

    try {
        let data = await Clothes.find(search).sort(sorting);
        res.send(data);
    } catch (error) {
        console.error('Ошибка при поиске одежды:', error);
        res.status(500).send({ message: 'Ошибка на сервере' });
    }
});
  
app.post(`/clothes`, async function (req, res){
    let type = req.body.type;
    let brand = req.body.brand;
    let model = req.body.model;
    let price = req.body.price;
    let size = req.body.size;
    let sex = req.body.sex;
    let img = req.body.img;
    let country = req.body.country;

    let clothes = new Clothes({
        type: type,
        brand: brand,
        model: model,
        price: price,
        size: size,
        sex: sex,
        img: img,
        country: country,
    })
    await clothes.save();
});

app.delete(`/clothes`, async function(req, res){
    let id = req.query.id
    await Clothes.deleteOne({_id:id})
    res.sendStatus(200)
})

app.put(`/clothes`, async function(req,res){
    let id = req.body.id;
    let clothes = await Clothes.findOne({_id:id});
    clothes.type = req.body.type;
    clothes.brand = req.body.brand;
    clothes.model = req.body.model;
    clothes.price = Number(req.body.price);
    clothes.size = req.body.size;
    clothes.sex = req.body.sex;
    clothes.img = req.body.img;
    clothes.country = req.body.country;
    await clothes.save()
})