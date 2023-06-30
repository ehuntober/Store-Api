
const Product = require('../models/products')

const getAllProductsStatic = async (req,res) =>{
    const products = await Product.find({}).sort('-name price')
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res) =>{

    const {featured, name, company, sort, fields}  = req.query
    const queryObject = {}

    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company){
        queryObject.company = company
    }

    if (name) {
        queryObject.name ={$regex: name, $options: 'i'}
    }
    // console.log(queryObject)
    let result = Product.find(query)
    if(sort){
        const sortList = sort.split(',').join('')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join('')
        result = result.select(fieldsList)
    }

    const products = await Product.find(queryObject)
 
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}