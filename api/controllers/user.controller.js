import db from '../models/index.js';

const { User } = db;

export const addUser = async (req, res) =>{
    try{
        await User.create({
            ...req.body
        })

        return res.status(200).send({message: `User has been added.` })

    }catch(error){
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

export const keepLoginUser = async (req, res) => {
    try {
      const userData = await User.findOne({
        where: {
          id: 1,
        },
      });
  
      if (!userData) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      return res.status(200).send({ message: 'Keep login', result: userData });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  };