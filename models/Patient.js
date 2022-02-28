const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array'); 

const PatientSchema = new mongoose.Schema({

    email: {
        type:String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
    type: String,
    enum: ['male', 'female','other'],
    required: true
    },

    weight: {
        type: mongoose.Types.Decimal128,
        max: 250
    },
    type: [{
        type: String
    }],
    residency: {
        type: String
    },

    followers: [{type:mongoose.Types.ObjectId, ref: 'Patient', unique:true}],

    clinicians: [{patient_id: {type: mongoose.Types.ObjectId,
                     ref: 'Doctor', unique:true}, 
                    date: {type: Date, default: Date.now},
                    _id : false}],
    chronics: [{ 
        chronic_name: {
        type: String,
        required:true
    },
        since: {
            type: Date,
            
        },
        state: {
            type: String,
            enum: []
           
        },
        _id : false


    }]


},
{timestamps: true}
)

PatientSchema.plugin(arrayUniquePlugin);
module.exports = mongoose.model('Patient', PatientSchema);