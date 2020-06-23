import jwt from 'jsonwebtoken'
import {promisify} from 'util'
import authConfig from '../../config/auth'


export default  async (req, res, next) =>{

   const jwtString = req.headers.authorization;

   if (!jwtString){
      return res.status(401).json({"error":"Missin token"})
   }

   const [, token] = jwtString.split(' ');

   try{

      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      const { id } = decoded;

      req.userId = id;

      next();
   } catch (err){
      return res.status(401).json({"error":"Token not valid"})
   }
   



} 