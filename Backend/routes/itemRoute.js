import express from 'express'
import multer from 'multer'
import { createItem, getItems, deleteItem } from '../controllers/itemController.js';

const itemRouter = express.Router();

// Type here multer funcation to store image
const storage = multer.diskStorage({
    destination: (_req, _file,cd) => cd(null, 'uploads/'),
    filename: (_req, file, cd) => cd(null, `${Date.now()}-${file.originalname}`)
})

const upload = multer({storage});

itemRouter.post('/',upload.single('image'), createItem);
itemRouter.get('/',getItems);
itemRouter.delete('/:id', deleteItem);

export default itemRouter