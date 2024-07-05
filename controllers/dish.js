import express from "express";
import DModel from '../models/Dish.js'
import mongoose from "mongoose";
const router = express.Router();


//get all dishes
router.get("/all",async(req,res)=>{
    try {
        let dishh = await DModel.find({});
        console.log(dishh);
        res.status(200).json(dishh)
    } catch (error) {
        console.log(error);
    }
});
// add new dish via /dish/add
router.post("/add", async(req,res) => {
    try {
        const {Name, Ingredients, Time} = req.body;
        if(!Name ||!Ingredients || !Time) {
            res.status(400);
            throw new Error("Enter All Fields");
        }
        const dish = await DModel.create({Name, Ingredients, Time});
        res.status(200).json({dish});
    } catch (error) {
        console.log(error);
    }
});

// get specific dish via its name -  /getbydish/enter dish
router.get("/getbydish/:D", async (req, res) => {
    try{

        let userdish = req.params.D
        const Name = await DModel.find({Name:userdish})
        if(!Name) {
            res.status(404);
            throw new Error("Dish with that Name not found");
        }
        res.status(200).json(Name);
    } catch (err) {
        console.log(err);
    }
});


// get specific dish via id -  /get/id
router.get("/get/:id", async (req, res) => {
    try{
        const d = await DModel.findById(req.params.id);
        if(!d) {
            res.status(404);
            throw new Error("not found");
        }
        res.status(200).json(d);
    } catch (err) {
        console.log(err);
    }
});


router.put("/edit/:id", async (req, res) => {
    try {
        const Dishedit = await DModel.findById(req.params.id);
        if(!Dishedit) {
            res.status(404);
            throw new Error("dish id is innorect, not found");
        }
        const updateddish = await DModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: updateddish});
    } catch(err) {
        console.log(err);
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const dd = await DModel.findById(req.params.id);
        if(!dd) {
            res.status(404);
            throw new Error("dish not found");
        }
        await DModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({message: "Dish successfully deleted"});
    } catch(err) {
        console.log(err);
    }
});

router.delete("/delall", async(req, res) => {
    try {
        await DModel.deleteMany();
        res.status(200).json({message: "All Dishes are deleted successfully."});
    } catch(err) {
        console.log(err);
    }
});

router.post("/insertmany", async (req, res) => {
    const dishess = req.body;
    if (!Array.isArray(dishess)) {
        return res.status(400).send('Input should be an array of Student details');
    }
    try {
        const result = await DModel.insertMany(dishess);
        res.status(200).json({message: `Added ${dishess.length} new Students.`});
    } catch (err) {
        console.log(err);
    }
});

export default router;