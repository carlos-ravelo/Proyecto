export interface Cliente{
	id?:number;
	nombre:String;
  telefonos?:String[];
  cuentas?:Cuenta[];
}

export interface Cuenta{
	banco:String;
	numero:string;	
}

export interface Prestamo{
	id?:number;	
	cliente:String;
	tasa:Number;
	tipoInteres:String;
	capitalInicial;
	montoCuotas?:Number;
	cantidadCuotas?:Number;
	fechaInicio?:Date;
	diaPagoMes:number;
}

export interface Movimiento{
	id:number;
	cliente:String;	
	tipoMovimiento:String;
	montoTotal:Number;
	capitalDelPago:number;
	interesDelPago;
	fechaTransaccion:String;
}

