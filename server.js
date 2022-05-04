const express = require('express');
const PORT = 8080;
const app = express();
const { Router } = express;
const router = Router();
const fs = require('fs');

const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);





app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', router);
app.use(express.static('./public'));

const server = app.listen(8080, () => {
    console.log('SERVER ON en http://localhost:8080')
})


app.set('view engine', 'ejs');





app.get('/', function (req, res) {
    res.render('pages/index', req.query);    
})


router.get('/productos/vista', (req, resp) => {
    let prods = productos.getAll()

    resp.render('pages/vista', {
        products: prods,
        hayProductos: prods.length
    });
});

router.post('/productos', (req, resp) => {
    new_index = productos.save(req.body) - 1;
    let disponibles = productos.getAll();
    let ultimo = disponibles[new_index];

    resp.redirect('/')

})







io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.emit('messages', chat_persistente);

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', chat_persistente);
    })
})




















// Contenedor e inicialización de inventario.

class Contenedor {

    constructor (path, name, price, id, thumbnail) {
        this.name = name;
        this.price = price;
        this.id = 1;
        this.thumbnail = thumbnail;
        this.route=path
    }

    save(Object) {
        Object.id = this.id++;
        let temp = [];

        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }

        temp.push(Object);
        fs.writeFileSync(this.route, JSON.stringify(temp));
        return Object.id;
    }

    getById(Number) {
        let temp = [];
        let prod_id = Number;
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        let sel = temp.filter(elegido => {
            return elegido.id === prod_id;
        })
        return sel
    }

    getAll() {
        let temp = [];
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        return temp;
    }

    deleteById(Number) {
        let temp = [];
        let prod_id = Number;
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        let sel = temp.filter(elegido => {
            return elegido.id != prod_id;
        })
        fs.writeFileSync(this.route, JSON.stringify(sel));
    }


    deleteAll() {
        let temp = [];
        let erase = [];
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        fs.writeFileSync(this.route, JSON.stringify(erase));
    }

    updateById(put_producto) {
        let temp = [];
        let prod_id = put_producto.id;
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }


        let sel = temp.map(elegido => {
            if (elegido.id === prod_id) {
                elegido = put_producto;
            }
            return elegido;
        })
        fs.writeFileSync(this.route, JSON.stringify(sel));
    }


}

let productos = new Contenedor('./productos.json');
let prod1 = {nombre: 'taza', price: 10, thumbnail: 'img1.png'};
let prod2 = {nombre: 'vaso', price: 20, thumbnail: 'img2.png'};
let prod3 = {nombre: 'plato', price: 30, thumbnail: 'img3.png'};

productos.save(prod1)
productos.save(prod2)
productos.save(prod3)





// Chat persistente


class Chat {

    constructor (path, email, dateTime, msg, id) {
        this.email = email;
        this.dateTime = dateTime;
        this.msg = msg;
        this.route=path
    }

    save(Object) {
        let temp = [];

        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }

        temp.push(Object);
        fs.writeFileSync(this.route, JSON.stringify(temp));
    }


    getAll() {
        let temp = [];
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        return temp;
    }



}

let chat_persistente = new Chat('./chat.json');

let inicia_chat = {"email": "server@server.com", "dateTime": "0", "msg": "Bienvenido"};

chat_persistente.save(inicia_chat);