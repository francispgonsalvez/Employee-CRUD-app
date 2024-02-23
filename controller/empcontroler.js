const asyncHandler = require('express-async-handler');
const Employee = require('../models/empmodels');
const multer = require('multer');
const path = require('path');


//to get all the contacts
// route:GET /api/employees
    const getemployees = asyncHandler(async(req,res)=>{
        const employees =await Employee.find();
        res.status(200).json(employees);
    });


// to get a specified employyee list
// route : GET / api/employees/:id
        const getemployee = asyncHandler(async(req,res)=>{
            const employee = await Employee.findById(req.params.id);
        if(!employee){
            res.status(404);
            throw new Error("contact not found");
        }
            res.status(200).json(employee);
        });


        const storage = multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,"uploads")
            },

        
            filename:(req,file,cb)=>{
                console.log(file);
                cb(null, Date.now() + path.extname(file.originalname));
            }
    })

const upload = multer({storage:storage}).single('image')
 
// to add an employee
    const postemployee = asyncHandler(async (req, res) => {
        upload(req, res, async function (err) {
            

        if(err instanceof multer.MulterError){

            res.status(400).json({error:"imagae upload error"})
        }
        else if(err){
            res.status(500).json({error:"server error"})
        }
        else{ 
            
    
                const {
                    // other employee fields
                    adress, city, country, dob, email, firstName, gender, lastName,
                    password, phone, pin, qualifications, salutation, state, username
                } = req.body; 
                console.log(adress, city, country, dob, email, firstName, gender, lastName,
                    password, phone, pin, qualifications, salutation, state, username)

                
    

                if (!adress || !city || !country || !dob || !email || !firstName || !gender ||
                    !lastName || !password || !phone || !pin || !qualifications || !salutation ||
                    !state || !username) {
                    res.status(400).json({ error: 'All fields are mandatory' });
                    return;
                }
                if (!req.file) {
                    res.status(400).json({ error: 'Image file is required' });
                    return; 
                }

                // Create an employee with image information
                const employee = await Employee.create({
                    adress, city, country, dob
                    , email, firstName, gender, lastName,
                    password, phone, pin, qualifications, salutation, state, username, image:req.file
                });

                res.status(201).json(employee);
            }
        })
        }
        );
// to update an employee
    const updemployee = asyncHandler(async(req,res)=>{
        upload(req, res, async function (err) {
            

            if(err instanceof multer.MulterError){
    
                res.status(400).json({error:"imagae upload error"})
            }
            else if(err){
                res.status(500).json({error:"server error"})
            }
        const employee = await Employee.findById(req.params.id);
        if(!employee){
            res.status(404);
            throw new Error("contact not found");
        }
        const image = {path:req.file.path};
        const updemployee = await Employee.findByIdAndUpdate(req.params.id,{
            ...req.body,image:image
        });
        console.log(updemployee);
        res.status(200).json(updemployee);
    });
    });
//image edit======

    // const empImage = asyncHandler(async (req, res) => {
    //     upload(req, res, async function (err) {
    //         const employee = await Employee.findById(req.params.id);
    //         if(err instanceof multer.MulterError){

    //             res.status(400).json({error:"imagae upload error"})
    //         }
    //         if (!employee) {
    //             res.status(404);
    //             throw new Error("Employee not found");
    //         }
    //         if (req.file) {
    //             employee.image = req.file.path;
    //             console.log(employee.image);
    //             const updatedEmployee = await employee.save();
    //             res.status(200)(updatedEmployee);
    //         }
    //         else {
    //             /** Handle the case where no file was uploaded */
    //             res.status(400).json({ error: "No image file provided" });
    //         }
    //     })
    // })





// to delete an employee
    const delemployee = asyncHandler(async(req,res)=>{
        const employee = await Employee.findById(req.params.id);
        if(!employee){

            res.status(404);
            throw new Error("contact not found");
        }
        const delEmployee = await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json(delEmployee);
    });



module.exports = {getemployees,getemployee,postemployee,updemployee,delemployee}

