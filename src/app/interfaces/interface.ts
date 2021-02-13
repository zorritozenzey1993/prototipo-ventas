export interface LoginResponse{
  accesso: boolean;
  rol: string;
}
export interface FormularioRegistro{
  nombre: string;
  apPat: string;
  apMat: string;
  correo: string;
  password: string;
  calle: string;
  colonia: string;
  numero: string;
  telefono: string;
}
export interface ProductoRequest{
  categoria: string;
      nombre: string;
      codigo: string;
      cantidad: number;
      precioUnitario: string;
      precio: string;
      stock: string;
      descripcion: string;
}
