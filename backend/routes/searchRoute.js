const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');
const Lab = require('../models/labsModel');
const Doctor = require('../models/doctorModel');
const Product = require('../models/productModel');


router.get('/search', async (req,res) => {
    try {
        const searchQuery = req.query.search

        if (!searchQuery) {
            return res.status(404).json({Message: "Search Query Required"})
        }
        // search in case sensitive as well
        const regEx = new RegExp(searchQuery,"i")

        const productCriteria = {
            $or: [
                {name: regEx},
                {description: regEx}
            ]
        }
        const doctorCriteria = {
            $or: [
                {name: regEx},
                {specialty: regEx},
                {description: regEx},
            ]
        }
        const labCriteria = {
            $or: [
                {name: regEx},
                {testsAvailable: regEx},
            ]
        }

        const categoryCriteria = {
            $or: [
                {name: regEx},
                {description: regEx},
            ]
        }

        const [products,doctors,labs,categories] = await Promise.all([
            Product.find(productCriteria),
            Doctor.find(doctorCriteria),
            Lab.find(labCriteria),
            Category.find(categoryCriteria)
        ])

        res.status(200).json({Message:"Search Results Success",results:{products,labs,doctors,categories}})
    } catch (error) {
        res.status(500).json({Message:"Search Error",error:error.message})
    }
})

module.exports = router