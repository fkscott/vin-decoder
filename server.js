const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const axios = require('axios');

app.use(cors());

app.get('/vindecode', (req, res) =>{
    console.log(`Decoding vin : ${req.query.vin}`);
    let vinNumber = req.query.vin;
    let modelYear = req.query.modelYear;
    console.log(vinNumber);
    console.log(modelYear);

    let api_request = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vinNumber}?format=json&modelyear=${modelYear}`;

    axios.get(api_request)
            .then(function (response) {
                console.log(response.data);

                res.send({
                    success: true,
                    data: response.data
                })
            })


            .catch(function (error) {
                res.send({
                    success: false,
                    data: []
                })
            })

});

app.use(express.static('public'));
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});