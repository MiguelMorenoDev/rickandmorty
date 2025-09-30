import { Router } from 'express';
import { createCharacter, deleteCharacter, getCharacter, getCharacters, updateCharacter } from '../controllers/characterController';

const characterRouter = Router();

characterRouter.post('/', createCharacter);
characterRouter.get('/', getCharacters);
characterRouter.get('/:id', getCharacter);
characterRouter.put('/:id', updateCharacter);
characterRouter.delete('/:id', deleteCharacter);

export default characterRouter;