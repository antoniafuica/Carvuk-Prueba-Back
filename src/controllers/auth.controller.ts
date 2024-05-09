import {Request, Response} from 'express';
import supabase from '../supabaseClient';

export const registerUser = async (req: Request, res: Response) => {
    try{
        const {email, password, firstName, lastName, phone} = req.body;

        if (!email || !password || !firstName || !lastName || !phone) throw new Error('Todos los campos son requeridos');

        const {data, error} = await supabase.auth.signUp({ email, password});
        if (error) throw error;
        if (data.user) {
            const {data: profileData, error: profileError} = await supabase
            .from('profiles')
            .insert([
                {id: data.user.id, email, firstName, lastName, phone}
            ]);
            if (profileError) throw profileError;
            return res.status(200).json({message: 'Usuario registrado con exito', user: {id: data.user.id, email, firstName, lastName, phone}});
        }
    } catch (error: any){
        console.error("Error al intentar registrar nuevo usuario ->", error.message);
        return res.status(500).json({message: error.message});
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) throw new Error('El email y la constraseña son obligatorios');

        const {data, error} = await supabase.auth.signInWithPassword({ email, password});
        if (error) throw error;
        if (data.session) {
            return res.status(200).json({message: 'Usuario logueado con exito', session: data.session});
        } else {
            throw new Error('Inicio de sesion fallido');
        }
    } catch (error: any){
        console.error("Error al intentar iniciar sesión ->", error.message);
        return res.status(500).json({message: error.message});
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try{

        const accessToken = req.body.accessToken || req.headers.authorization?.split(' ')[1];
        if (!accessToken) throw new Error('El token de acceso es requerido para cerrar sesión');

        const {error} = await supabase.auth.signOut(accessToken);
        if (error) throw error;
        return res.status(200).json({message: 'Sesion cerrada con exito'});
    } catch (error: any){
        console.error("Error al intentar cerrar sesión ->", error.message);
        return res.status(500).json({message: error.message});
    }
};

