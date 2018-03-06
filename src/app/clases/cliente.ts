import { Moment } from 'moment';

export interface Cliente {
	id?: string;
	nombre: String;
	telefonos?: String[];
	cuentas?: Cuenta[];
	notas?: string;

}

export interface Cuenta {
	banco: String;
	numero: string;
}

export interface Prestamo {
	numeroPrestamo?: string;
	cliente: string;
	tasa: number;
	capitalPrestado: number;
	montoCuotas?: number;
	cantidadCuotas?: number;
	fechaInicio?: any;
	fechaProximoPago: any;
	pagadoCapital?: number;
	capitalPendiente?: number;
	notas?: string;

}

export interface Movimiento {
	id?: string;
	numeroPrestamo;
	cliente: string;
	tipoMovimiento: string;
	interesDelPago: number;
	capitalDelPago: number;
	montoPrestado: number;
	montoTotal: number;
	fechaCorrespondiente?: any;
	fechaTransaccion: any;
	notas?: string;
}

