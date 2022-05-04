const db = require('./connect');

exports.createProduct = (req, res) => {
    const nama = req.body.nama;
    const harga = req.body.harga;
    const rating = req.body.rating;
    const description = req.body.description;

    db.query("INSERT INTO products SET ? ", {
        nama: nama,
        harga: harga,
        rating: rating,
        description: description,
    }, (err, result) => {
        if (err) throw err
        return res.send({ error: false, products: result, message: "Produk Telah Di Perbaharui" });
    })
}

exports.allProducts = (req, res) => {
    const showData = "SELECT * FROM products";
    db.query(showData, (err, result) => {
        if (err) throw error;
        return res.send({ error: false, products: result })
    })
}

exports.getProductId = (req, res) => {
    let id = req.params.id
    const getId = 'SELECT * FROM products WHERE id = ?'
    if (!id) {
        return res.status(400).send({
            error: true,
            message: 'Masukan ID yang benar'
        })
    }
    db.query(getId, id, (err, result) => {
        if (err) throw error;
        return res.send({ error: false, products: result[0], message: "Product Telah Di Temukan" })
    })

}

exports.editProduct = (req, res) => {
    const data = { ...req.body }
    const getId = 'SELECT * FROM products where id = ?'
    const getUpdate = "UPDATE products SET ? WHERE id = ?"

    db.query(getId, req.params.id, (err, result, field) => {
        if (err) throw error;

        if (result.length) {
            db.query(getUpdate, [data, req.params.id], (err, result, field) => {
                if (err) {
                    res.send({
                        error: true,
                        message: 'Ada Kesalahan'
                    })
                };
                return res.send({ error: false, products: result, message: "Produk Telah Di Update" })
            })
        } else {
            return res.send({
                error: true,
                message: "Produk Tidak Di temukan"
            })
        }

    });
}

exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    const hapusData = "DELETE FROM products where id = ?"
    if (!id) {
        return res.status(400).send({
            error: true,
            message: "Mohon Masukan ID Dengan Benar"
        })
    }
    db.query(hapusData, [id], (err, result) => {
        if(err) throw error;
        return res.send({
            error: false,
            products: result,
            message: "Produk Telah Di Hapus"
        })
    })
}