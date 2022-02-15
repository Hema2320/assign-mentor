var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient}=require('../dbSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
});
router.post('/students',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try 
  {
    const db = await client.db('class')
    let users = await db.collection('users').find({email:req.body.email}).toArray();
    if(users.length>0)
    {
      res.json({
        statusCode:400,
        message:"Student already exists"
      })
    }
    else
    {
      let document = await db.collection('users').insertOne(req.body)
      res.json({
        statusCode:201,
        message:"Student Sign Up successfully",
        data:document
      })
    }
  } catch (error) 
  {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal server Error"
    })
  }
  finally
  {
    client.close();
  }
})
router.post('/mentors',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try 
  {
    const db = await client.db('class')
    let users = await db.collection('users').find({email:req.body.email}).toArray();
    if(users.length>0)
    {
      res.json({
        statusCode:400,
        message:"Mentor already exists"
      })
    }
    else
    {
      let document = await db.collection('users').insertOne(req.body)
      res.json({
        statusCode:201,
        message:"Mentor Sign Up successfully",
        data:document
      })
    }
  } catch (error) 
  {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal server Error"
    })
  }
  finally
  {
    client.close();
  }
})
router.post('/assigning_student',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try 
  {
    const db = await client.db('class')
    let mentors = await db.collection('users').find({email:req.body.email}).toArray();
    if(mentors.length==0)
    {
      let student = await db.collection('users').insertOne(req.body)
      res.json({
        statusCode:400,
        message:"Student are allocated for you",
        data:student
      })
    }
    else{
      res.json({
            statusCode:400,
            message:"Already assigned"
      })
    }  
  } catch (error) 
  {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal server Error"
    })
  }
  finally
  {
    client.close();
  }
})
router.put('/change-mentor',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try 
  {
    const db = await client.db('class')
    let student = await db.collection('users').find({email:req.body.email}).toArray();
    if(student.length>0)
    {
      
      if(student[0].name===req.body.updatedname)
      {
        let update = await db.collection('users').updateOne({email:req.body.email},{$set:{name:req.body.updatedname}})
        res.json({
          statusCode:200,
          message:"Assigned mentor successfully"
        })
      }
      else{
        res.json({
          statusCode:400,
          message:"Invalid"
        })
      }
    }
    else{
      res.json({
        statusCode:400,
        message:"User does not exists"
      })
    }
  } catch (error) 
  {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal server Error"
    })
  }
  finally
  {
    client.close();
  }
})
router.get('/all',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try 
  {
    const db = await client.db('class')
    let mentor = await db.collection('users').find({mentor:req.body.mentor}).toArray();
    let students=await db.collection('users').find().toArray();
    if(mentor==0)
    res.json({
      statusCode:200,
      students
    })
  } catch (error) 
  {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal server Error"
    })
  }
  finally
  {
    client.close();
  }
})









module.exports = router;
