import { Schema, model, models } from "mongoose";


const propertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,

    },
    type: {
        type: String,
        required: true,

    },
    description: {
        type: String
    },
    location: {
        street: {
            type: String
        },
        city: {
            type: String
        }
    },
    beds: {
        type: Number,
        required: true,
    },
    baths: {

        type: Number,
        required: true,
    },
    square_feet: {
        type: Number,
        required: true,
    },

    amenities: [
        {
            type: String
        }
    ],
     rates: {
        //  daily: {
        //      type:Number
        //  },
         weekly: {
            type:Number
        },
        monthly: {
            type:Number
        },
        sale: {
            type: Number
        },
     },
     seller_info: {
         name: {
             type: String,

         },
         email: {
            type: String,

        },
        phone: {
            type: String,

        },
     },
     images: [
         {
             type:String
         }
     ],
     is_featured: {
         type: Boolean,
         default: false
     }


}, {
    timestamps: true
})

const Property = models.Property || model("Property", propertySchema);


export default Property;