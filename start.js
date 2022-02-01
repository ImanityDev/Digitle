let express = require('express')
let path = require('path')
let app = express()

const Port = process.env.PORT || 3000

app.use(express.static(__dirname))

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, 'digitle.html'))
})

app.listen(Port, function() {
    console.log("Server started on Port 3000")
})