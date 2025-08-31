import jwt from 'jsonwebtoken'

const JWT_SECRETP = process.env.JWT_SECRET

const auth = (req, res, next) => {

    const token = req.headers.authorization
    console.log(token)

    if(!token) {
        return res.status(401).alert('error')
    }

   try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRETP);
        console.log('Token decodificado com sucesso:', decoded); 
        req.userId = decoded.id;
        next();

   } catch (error) {
        console.error(error)
        return res.status(401).json({message: 'Token Invalido'})
   }

   
}
export default auth