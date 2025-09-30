import {Request, Response } from 'express';
import { CharacterModel } from '../data';
import { ICharacter } from '../interfaces/character.interface';
import { IErrorResponse } from '../interfaces/error.interface';
import { ICharacterFilter } from '../interfaces/characterFilter.interface';
import { ICharacterParams } from '../interfaces/characterParams.interface';

// CREATE
export const createCharacter = async (
    req: Request<{},{},ICharacter,{}>,
    res: Response <ICharacter | IErrorResponse> ) => {
    try {
        const newCharacter = await CharacterModel.create(req.body);
        res.status(201).json( newCharacter );
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Invalid input data',
                details: error.message
            });
        }
        res.status(500).json({ error: 'Internal server error'});
    }
}

// READ all characters
export const getCharacters = async (
    req: Request <{},{},{},ICharacterFilter>,
    res: Response <ICharacter[] | IErrorResponse> ) => {
  try {
    const filters: ICharacterFilter = {};
    if (req.query.name) filters.name = req.query.name;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.species) filters.species = req.query.species;
    if (req.query.type) filters.type = req.query.type;
    if (req.query.gender) filters.gender = req.query.gender;
    const filteredCharacters = await CharacterModel.find(filters);
    res.json(filteredCharacters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error retrieving characters'});
  }
};

// READ 1 character
export const getCharacter = async (
    req: Request<ICharacterParams,{},{},{}>,
    res: Response <ICharacter | IErrorResponse> ) => {
    const { id } = req.params;
    try {
        const character = await CharacterModel.findOne( { id: Number(id) } );
        if (!character) {
            return res.status(404).json({ error: 'Character not found'});
        }
        res.json(character);
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving character'});
    }
}

// UPDATE
type ICharacterUpdate = Partial<ICharacter>
export const updateCharacter = async (
    req: Request<ICharacterParams,{},ICharacterUpdate,{}>,
    res: Response <ICharacter | IErrorResponse> ) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedCharacter = await CharacterModel.findOneAndUpdate(
            { id: Number(id)},
            updateData,
            { new: true }
        );
        if ( !updatedCharacter) {
            return res.status(404).json({ error: 'Character not found'});
        }
        res.json( updatedCharacter );
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Update failed' });
    }
}

// DELETE
export const deleteCharacter = async (
    req: Request<ICharacterParams,{},{},{}>,
    res: Response <{ message: string } | IErrorResponse> ) => {
    const { id } = req.params;
    try {
        const result = await CharacterModel.findOneAndDelete({id: Number(id) });
        if ( !result ) {
            return res.status(404).json( { error: 'Character not found'} );
        }
        res.json({ message: 'Character deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Delete failed' });
    }
}