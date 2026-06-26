const express = require("express");
const axios = require("axios");

const app = express();

const API = "https://thread-broke-artwork-compound.trycloudflare.com/api/txmd5";

let lastPhien = null;
let lastPrediction = null;

app.get("/predict", async (req, res) => {
    try {
        const { data } = await axios.get(API);

        // Mỗi phiên chỉ tạo 1 dự đoán
        if (lastPhien !== data.phien) {
            lastPhien = data.phien;
            lastPrediction = Math.random() < 0.5 ? "TÀI" : "XỈU";
        }

        res.json({
            Phien: Number(data.phien),
            Tong: data.tong,
            Ket_qua: data.ket_qua,
            Xuc_xac_1: data.xuc_xac_1,
            Xuc_xac_2: data.xuc_xac_2,
            Xuc_xac_3: data.xuc_xac_3,

            phien_hien_tai: Number(data.phien) + 1,
            du_doan: lastPrediction
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("MD5 Prediction API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});