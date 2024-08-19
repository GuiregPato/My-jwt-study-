const User = require("../Modal/user");
const bcrypt = require('bcrypt');
const { gerarToken, tokenVerify } = require("../auth/userAuth");
const jwt = require('jsonwebtoken');
const { name } = require("ejs");

const Regis = async (req,res) =>{
  const {name, pass} = req.body;

  if(!name){
    return res.status(500).json({Message:"preencha o nome!"});
  }
  if(!pass){
    return res.status(500).json({Message: "preencha a senha!"});
  }

  const salt =  await bcrypt.genSalt(12);
  const passHash = await bcrypt.hash(pass, salt)
  
  try {
    const user ={name, pass:passHash}
    await User.create(user);
    res.redirect('/')
  } catch (error) {
    res.status(500).json({ message: "Usuario não inserido", error });
  }
}

const Login = async(req, res) =>{
    const {name, pass} = req.body

    if(!name){
        return res.status(500).json({Message:"preencha o nome!"});
      }
      if(!pass){
        return res.status(500).json({Message: "preencha a senha!"});
      }

      const usuario = await User.findOne({name: name})
      if (!usuario){
        return res.status(401).json({message: 'Usuario não encontrado'})
      }

      const checkPass = await bcrypt.compare(pass, usuario.pass)
      if(!checkPass){
        res.status(422).json({message:"Senha incorreta"})
      }
        const token = jwt.sign({usuario}, process.env.secret , {expiresIn: '1h'}); 
        res.cookie('token', token, {
            httpOnly: true
        })
      return res.redirect('/private')
}

    const Find = async (req, res) =>{
       try{ 
      const user = await User.find()        
      res.json(user) 
    }catch(err){
      res.status(401).json({Message: "Erro ao Mostrar usuario"})
      
    }
                   
    }



    const Homepage =  (req,res) =>{
            res.render('home')
    }

    const Private = (req, res) =>{
      res.render('private')
    }
    const Cadastro = (req,res) =>{
      res.render('regist')
    }
module.exports = {
  Find,
  Regis,
   Login, 
   Homepage, 
   Private,
   Cadastro
}