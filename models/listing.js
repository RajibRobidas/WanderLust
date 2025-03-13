const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage",
            set: (v) => v === "" ? "listingimage" 
            : v,
        },
        url: {
            type: String,
            default: "https://img.freepik.com/free-photo/rocks-beach-surrounded-by-greenery-sea-sunlight-praslin-seychelles_181624-27727.jpg?t=st=1737648224~exp=1737651824~hmac=407af9cb2a9559bd73efbee09755f7fe9b899a008e4171f76012117b1b2d3206&w=900",
            set: (v) => v === "" ? "https://images.fineartamerica.com/images-medium-large-5/beautiful-beach-resort-phototalk.jpg" 
            : v,
        }
        //https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fbeautiful-seascape&psig=AOvVaw0NuaKS-kIFgwLVxuWzEszT&ust=1737734730129000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCQ77ucjIsDFQAAAAAdAAAAABAE
        //https://images.fineartamerica.com/images-medium-large-5/beautiful-beach-resort-phototalk.jpg
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    // category: {
    //     type: [Number],
    //     enum: ["mountains", "arctic", "farms", "deserts"]
    // }
});


listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

