// import { Request, Response, NextFunction } from 'express';
// import jwt, { VerifyErrors, Secret } from 'jsonwebtoken';
//
// const secretKey = process.env.SECRET;
//
// interface DecodedUser {
//     // Define the structure of the decoded user if needed
//     // For example, if your JWT payload contains a 'user' property
//     // you can define it here.
//     user: string; // Adjust this based on your actual payload structure
// }
//
// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;
//
//     if (!token) {
//         return res.status(403).json({ 'error': 'Token is missing!' });
//     }
//
//     jwt.verify(token, secretKey as Secret, (err: VerifyErrors | null, decoded: any) => {
//         if (err) {
//             return res.status(401).json({ 'error': 'Token is invalid!' });
//         }
//
//         // Assuming the decoded object contains a 'user' property
//         // Adjust this according to the structure of your JWT payload
//         if (decoded && decoded.user) {
//             // Assign the decoded user to the request
//             (req as any).user = decoded.user;
//             next();
//         } else {
//             return res.status(401).json({ 'error': 'Invalid token payload!' });
//         }
//     });
// };
//
// export default verifyToken;


import jwt from "jsonwebtoken";
const secretKey:any = process.env.SECRET_KEY;

const verifyToken= (req:any, res:any, next:any)=>{
    const token = req.headers.authorization;
    console.log(token);
    if(!token){
        return res.status(403).json({'error':'token is missing!'});
    }
    jwt.verify(token, secretKey,(err:any,decoded:any)=>{
        if(err){
            return res.status(401).json({'error':'token is invalid!'});
        }

        next();
    });
}
module.exports=verifyToken;