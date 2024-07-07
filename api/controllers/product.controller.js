import db from '../models/index.js';

const { Product } = db;

export const createProduct = async (req, res) =>{
    try{
        const {name, description, price} = req.body;

        const findProduct = await Product.findOne({
            where:{
                name: name
            }
        })

        if(findProduct){
            return res.status(500).send({message: "A product with the same name already exist"});
        }

        await Product.create({
            ...req.body
        })

        return res.status(200).send({message: `${name} has been created.` })

    }catch(error){
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    try{
        const productData = await Product.findAll();

        return res.status(200).send({result: productData})

    }catch(error){
        console.error(error)
        return res.status(500).send({message: error.message})
    }
}