import jwt from 'jsonwebtoken'
import User from '../Models/User'
import AuthConfig from '../../config/auth'
import * as Yup from 'yup'

class SessionController {

   async store(req, res){

      const schema = Yup.object().shape({
         email:Yup.string().required(),
         password:Yup.string().required().min(6)
      });

      if (!(await schema.isValid(req.body))){
         return res.status(400).json({error:"parametros invalidos"})
      }
      
      const {email, password } = req.body;

      const user = await User.findOne({where:{email}});

      if (!user){
         return res.status(401).json({"error": "Não autorizado!"})
      }

      const authorized = await user.checkPassword(password);

      if (!authorized ){
         console.log("Não autorizado..")
         return res.status(401).json({"error": "Não autorizado!"})
      }
     
      const {id, name} = user;
      res.json({
         user:{
            id,
            name,
            email,
         },
         token: jwt.sign({id}, AuthConfig.secret, {expiresIn: AuthConfig.expiresIn} )
      })
   }

}

export default new SessionController();