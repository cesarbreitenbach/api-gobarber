import User from '../Models/User'
import * as  Yup from 'yup'

class UserController {
   async store(req, res) {

      const schema = Yup.object().shape({
         name: Yup.string().required(),
         email: Yup.string()
            .email()
            .required(),
         password: Yup.string()
            .required()
            .min(6)
      })
      const valid = await schema.isValid(req.body);

      if (!valid) {
         return res.status(400).json({ error: "Params is invalid!" })
      }

      const userExists = await User.findOne({ where: { email: req.body.email } })

      if (userExists) {
         return res.status(400).json({ error: "User already exists!" })
      }

      const { id, name, email, provider } = await User.create(req.body)


      return res.json({
         id,
         name,
         email,
         provider
      })
   }
   async update(req, res) {

      const schema = Yup.object().shape({
         name: Yup.string(),
         email: Yup.string()
            .email(),
         oldPassword: Yup.string().min(6),
         password: Yup.string()
            .min(6)
            .when('oldPassword', (oldPassword, field) => 
               oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password',  (password, field) => 
                                                password ? field.required().oneOf([Yup.ref('pasword')]) : field
                                             )
      })

      const valid = await schema.isValid(req.body);

      if (!valid) {
         return res.status(400).json({ error: "Params is invalid!" })
      }


      const { name, email, password, oldPassword, provider } = req.body;

      const user = await User.findByPk(req.userId);

      if (!user) {
         return res.status(400).json({ error: "Token expirou" })
      }

     
         if (email && user.email !== email ) {
            const userExists = await User.findOne({ where: { email } })

            if (userExists) {
               return res.status(400).json({ error: "Email already exists!" })
            }
         }

         if (password) {
            if (!oldPassword) {
               return res.status(401).json({ error: "OldPassword is required!" })
            }
            if (oldPassword && (!await user.checkPassword(oldPassword))) {
               return res.status(400).json({ error: "Invalid password!" })
            }
         }
      
      await user.update({
         name,
         email,
         password,
         provider
      })

      return res.json({ "sucess": "OK, updated" })
   }

}

export default new UserController();