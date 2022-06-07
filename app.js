let express=require('express');
let app=express();
let dotenv=require('dotenv').config();
let bodyParser=require('body-parser');
let cors = require('cors');
let mongo=require('mongodb');
let port=process.env.PORT || 8654;
let mongoUrl=process.env.MongoLiveUrl;
let MongoClient=mongo.MongoClient;
let db;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send('JioMart API running')
})

app.get('/category',(req,res)=>{

    db.collection('category').find().toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
}) 

app.get('/category/:categoryId',(req,res)=>{
    let categoryId=Number(req.params.categoryId) ;
    query={}
    if(categoryId)
  {
    query={"Category_id":categoryId}
  }
 

    db.collection('category').find(query).toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
})

app.get('/items',(req,res)=>{

    db.collection('items').find().toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
})
app.get('/product/:productId',(req,res)=>{
    let productId=Number(req.params.productId) ;
    query={}
    if(productId)
  {
    query={"Product_id":productId}
  }
 

    db.collection('items').find(query).toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
}) 
app.get('/items/:categoryId',(req,res)=>{
    let sort={Price:1};
    let categoryId=Number(req.params.categoryId);
    let brandName=req.query.brandName;
    let size=req.query.size;

    query={}
    if(req.query.sort)
    {
        sort={Price:req.query.sort}
    }
    if(brandName && size )
    {
       query= {"Category_id":categoryId,"Brand":brandName,"Size":size}  
    }
   else if(brandName)
  {
    query={"Category_id":categoryId,"Brand":brandName}
  }
  else if(size){
    query={"Category_id":categoryId,"Size":size}
  }
  else {
    query={"Category_id":categoryId}
}
  
 

    db.collection('items').find(query).toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
})

app.get('/filter/:categoryId',(req,res)=>{

    let sort={Price:1};
    let categoryId=Number(req.params.categoryId);
    if(req.query.sort)
    {
        sort={Price:req.query.sort}
    }
    query={}
    if(categoryId)
  {
    query={"Category_id":categoryId}
  }
 


    db.collection('items').find(query).sort(sort).toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
})
app.get('/filterRating/:categoryId',(req,res)=>{

    let sort={Rating:1};
    let categoryId=Number(req.params.categoryId);
    if(req.query.sort)
    {
        sort={Rating:req.query.sort}
    }
    query={}
    if(categoryId)
  {
    query={"Category_id":categoryId}
  }
 


    db.collection('items').find(query).sort(sort).toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
})
app.get('/ratedItem',(req,res)=>{

    let sort={Rating:-1};
    
    if(req.query.sort)
    {
        sort={Rating:req.query.sort}
    }
    
    
 


    db.collection('items').find().sort(sort).toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
})
app.get('/order',(req,res)=>{

    db.collection('order').find().toArray((err,result)=>{
       if(err) throw err;
       res.send(result)
     })
}) 
app.post('/placeOrder',(req,res) => {

    db.collection('order').insert(req.body,(err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })
// app.get('/items/:brandName',(req,res)=>{
     
    
//     let brandName=req.query.brandName;

//     query={}
//     if(brandName)
//   {
//     query={"Brand":brandName}
//   }
   
 

//     db.collection('items').find(query).toArray((err,result)=>{
//        if(err) throw err;
//        res.send(result)
//      })
// })
 



///connection with db
MongoClient.connect(mongoUrl,(err,client) => {
    if(err)  {console.log(`Error While Connecting`)};
    
    db = client.db('jiomartdb');
    
  
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Express Server listening on port ${port}`)
    })
  })

  //MongoUrl="mongodb://localhost:27017"
   
   
   