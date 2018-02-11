export interface Cliente {
	id?: string;
	nombre: String;
	telefonos?: String[];
	cuentas?: Cuenta[];
	notas?:string;

}

export interface Cuenta {
	banco: String;
	numero: string;
}

export interface Prestamo {
	numeroPrestamo?: string;
	cliente: string;
	tasa: number;
	capitalPrestado:number;
	montoCuotas?: number;
	cantidadCuotas?: number;
	fechaInicio?: Date;
	diaPagoMes: number;
	pagadoCapital?:number;
	capitalPendiente?:number;
	notas?:string;

}
/* export class Movimiento {
	constructor(
	numeroPrestamo,
	cliente: string,
	tipoMovimiento: String,
	interesDelPago:number=0,
	capitalDelPago:number=0,
	montoPrestado:number=0,
	montoTotal: number=0,
	fechaTransaccion: string,
	fechaCorrespondiente?:string,
	notas?:string,
	id?: string


	){}
} */

export interface Movimiento {
	id?: string;
	numeroPrestamo;
	cliente: string;
	tipoMovimiento: string;
	interesDelPago:number;
	capitalDelPago:number;
	montoPrestado:number;
	montoTotal: number;
	fechaCorrespondiente?:Date;
	fechaTransaccion: Date;
	notas?:string;
}

