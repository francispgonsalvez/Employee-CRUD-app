
const mongoose = require('mongoose');


const employeeScheme = mongoose.Schema(
    {
        
        adress:{
            type:String,
            required:[true,"please fill the adress"]
        },
        city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        dob:{
            type:Date,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
    
        password:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        pin:{
            type:Number,
            required:true
        },
        qualifications:{
            type:String,
            required:true
        },
        salutation:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        image:{
            path: String,
            
        }
      
    },
    {
        timestamps: true
    }
)
const employee = mongoose.model('employee', employeeScheme);
module.exports = employee;