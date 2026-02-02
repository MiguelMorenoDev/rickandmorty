import { Router } from 'express';
import { createCharacter, deleteCharacter, getCharacter, getCharacters, updateCharacter } from '../controllers/characterController';
import { validateSchema } from '../middlewares/validateSchema';
import { 
  createCharacterSchemaValidation, 
//   updateCharacterSchema, 
//   getCharacterSchema, 
//   deleteCharacterSchema 
} from '../validations/character.validation';
const characterRouter = Router();

characterRouter.post('/', validateSchema(createCharacterSchemaValidation), createCharacter);
characterRouter.get('/', getCharacters);
characterRouter.get('/:id', getCharacter);
characterRouter.put('/:id', updateCharacter);
characterRouter.delete('/:id', deleteCharacter);

export default characterRouter;