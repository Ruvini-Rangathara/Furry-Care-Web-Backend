// import express, { Request, Response } from "express";
// import multer from 'multer';
// import path from "path";
//
// const petRouter = express.Router();
//
// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req: Request, file: Express.Multer.File, cb: (error: null | Error, filename: string) => void) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });
//
// const upload = multer({
//     storage: storage
// });
//
// petRouter.post('/', upload.single('image'), (req: Request, res: Response) => {
//     res.json({
//         success: 1,
//         profile_url: `http://localhost:3000/upload/images/${req.file?.filename}`
//     });
// });
//
// // Serve static files
// petRouter.use('/images', express.static('upload/images'));
//
// // Error handling middleware
// function errHandler(err: Error, req: Request, res: Response, next: () => void) {
//     if (err instanceof multer.MulterError) {
//         res.json({
//             success: 0,
//             message: err.message
//         });
//     } else {
//         next(); // Pass the error to the next error handler
//     }
// }
//
// petRouter.use(errHandler);
//
// export default petRouter;





import express, { Request, Response } from "express";
import multer from 'multer';
import { Storage } from '@google-cloud/storage';

const Router = express.Router();

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Google Cloud Storage setup
const storageClient = new Storage({
    keyFilename: 'src/infinite-badge-391615-600ecb76f9f0.json', // Replace with your key file path
    projectId: 'infinite-badge-391615', // Replace with your project ID
});

const bucketName = 'furrycarebucket'; // Replace with your bucket name

Router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    console.log("In image controller backend");
    try {
        if (!req.file) {
            return res.status(400).json({ success: 0, message: 'No file uploaded.' });
        }

        const fileBuffer = req.file.buffer;
        const originalname = req.file.originalname;

        const bucket = storageClient.bucket(bucketName);
        const file = bucket.file(originalname);

        await file.save(fileBuffer);

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${originalname}`;

        res.json({ success: 1, profile_url: publicUrl });
        console.log("image saved!")
    } catch (err) {
        console.error('Error uploading to Google Cloud Storage:', err);
        res.status(500).json({ success: 0, message: 'Internal server error.' });
    }
});

// Serve static files from Google Cloud Storage
Router.use('/images', express.static(`https://storage.googleapis.com/${bucketName}`));

export default Router;


