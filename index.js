const express = require("express");
const app = express();
app.use(express.json());
var rooms = [];
var bookedrooms = [];

app.post("/createroom", function(req,res) {
  var data = {
    roomname: req.body.roomname,
    roomid: req.body.roomid,
    noseats: req.body.noseats,
    amenities: req.body.amenities,
    price1Hr: req.body.price1Hr,
    bookedStatus: false
  }
  rooms.push(data);
  console.log(rooms);
    res.json({ 
           message: "Room Created Successfully"
      
    })
})

app.post("/bookroom", function(req,res) {

       //customer
       var data1 = {
        CustomerName : req.body.CustomerName,
        Date : req.body.Date,
        StartTime: req.body.StartTime,
        EndTime : req.body.EndTime,
        roomid : req.body.roomid,
      }
      var roomObject = rooms.find((room) => room.roomid === req.body.roomid );
      if(roomObject && roomObject.bookedStatus === false){
        bookedrooms.push(data1);
        roomObject.bookedStatus = true;
        console.log(roomObject);
        console.log(bookedrooms);
        res.json({
          // [bookedroom]
               message: "Room Booked Successfully"
        })
      }else{
        res.json({
        
               message: "Room Doesn't Exist"
        })
      }
     
})

app.get("/listrooms", function(req,res) {
 var listrooms = bookedrooms.map((bookedroom) => {
    var roomdata = rooms.find(room => room.roomid === bookedroom.roomid)
    return {
        ...bookedroom,
        roomname: roomdata.roomname,
        bookedStatus: roomdata.bookedStatus
    }
 })   
 res.json(listrooms);
})
app.get("/listcustomers", function(req,res) {
  var listcustomers = bookedrooms.map((bookedroom) => {
    var roomdata = rooms.find(room => room.roomid === bookedroom.roomid)
    return {
        ...bookedroom,
        roomname: roomdata.roomname
    }
 })   
 res.json(listcustomers);
})

app.listen(process.env.PORT || 5000, () => console.log(`It's Alive on ${5000}`))