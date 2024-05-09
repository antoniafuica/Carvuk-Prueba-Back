import {Request, Response} from 'express';
import supabase from '../supabaseClient';

export const createServicio = async (req: Request, res: Response) => {
    try {
        const {fechaAgendamiento, horaAgendamiento, valor, nombreServicio, patenteVehiculo, direccionIda, 
            comunaDireccionIda, tipoDireccionIda, datosAdicionalesIda, direccionVuelta, comunaDireccionVuelta,
            tipoDireccionVuelta, datosAdicionalesVuelta} = req.body;
        
        if (!fechaAgendamiento || !horaAgendamiento || !valor || !nombreServicio || !patenteVehiculo || !direccionIda ||    
            !comunaDireccionIda || !direccionVuelta || !comunaDireccionVuelta ) throw new Error('Todos los campos son requeridos');

        const {data, error} = await supabase
        .from('servicios')
        .insert([
            {fechaAgendamiento, horaAgendamiento, valor, nombreServicio, patenteVehiculo, direccionIda, 
                comunaDireccionIda, tipoDireccionIda, datosAdicionalesIda, direccionVuelta, comunaDireccionVuelta,
                tipoDireccionVuelta, datosAdicionalesVuelta}
        ]);
        if (error) throw error;
        return res.status(201).json({message: 'Servicio creado con exito', servicio: data});

    } catch (error: any) {
        console.error("Error al intentar crear un nuevo servicio ->", error.message);
        return res.status(400).json({message: error.message});
    }
};

export const getServicios = async (req: Request, res: Response) => {
    try {
        const {data, error} = await supabase
        .from('servicios')
        .select('*');
        if (error) throw error;
        return res.status(200).json({servicios: data});
    } catch (error: any) {
        console.error("Error al intentar obtener los servicios ->", error.message);
        return res.status(400).json({message: error.message});
    }
};

export const getServicio = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {data, error} = await supabase
        .from('servicios')
        .select('*')
        .eq('id', id);
        if (error) throw error;
        if (!data) return res.status(404).json({message: 'Servicio no encontrado'});
        return res.status(200).json({servicio: data});
    } catch (error: any) {
        console.error("Error al intentar obtener un servicio ->", error.message);
        return res.status(400).json({message: error.message});
    }
};

export const deleteServicio = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {data, error} = await supabase
        .from('servicios')
        .delete()
        .match({id});
        if (error) throw error;
        return res.status(200).json({message: 'Servicio eliminado con exito', servicio: data});
    } catch (error: any) {
        console.error("Error al intentar eliminar un servicio ->", error.message);
        return res.status(400).json({message: error.message});
    }
}
