
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const clientesData = [
      {
        id:1,
        nombre: "Rocio Ravelo",
        telefonos: ["8298381306"],
        cuentas: [{
          banco: "BHD",
          numero: "789562648"
        }]
      },
      {
        id:2,
        nombre: "Carlos Omar Ravelo Alvarez",
        cuentas: [
          {
            banco: "Popular",
            numero: "744180936"
          }
        ],
        telefonos: [
          "8097476749",
          "8095914981"
        ]
      },
      {
        id:3,
        nombre: "Vladimir Gonzalez",
        "cuentas": [
          {
            "banco": "Popular",
            "numero": "759539059"
          },
        ],
        "telefonos": [
          "809747676964",
        ]
      }, {
        id:4,
        nombre: "Felix Gomez",
        cuentas: [
          {
            banco: "Popular",
            numero: "795080530"
          }
        ],
        telefonos: [
          "8098034849",
          "8096351842"
        ]
      }]
      const listaBancos = [
        "Popular","Progreso","BHD","Banreservas"

      ]

      const prestamosData = [
        {
          id: 1,
          cliente: 'Carlos Ravelo',
          tipoInteres:"mensual",
          capitalPrestado:200000,
          tasa: 5,
          montoCuotas:20000,
          cantidadCuotas:10,
          fechaInicio:'15-09-2017',
          diaPagoMes:30
        },
        {
          id: 2,
          cliente: 'Ramces Gomez',
          tipoInteres:"mensual",
          capitalPrestado:200000,
          tasa: 5,
          montoCuotas:20000,
          cantidadCuotas:10,
          fechaInicio: new Date('15-09-2017'),
          diaPagoMes:30
        },
        {
          id: 3,
          cliente: 'Vladimir Gonzalez',
          tipoInteres:"mensual",
          capitalPrestado:200000,
          tasa: 5,
          montoCuotas:20000,
          cantidadCuotas:10,
          fechaInicio: new Date('15-09-2017'),
          diaPagoMes:30
        },
      ]
      const movimientosData = [
        {
          id: 1,
          cliente: 'Carlos Ravelo',
          tipoMovimiento:'pago',
          montoTotal:200,
          capitalDelPago:100,
          interesDelPago:100,
          fechaTransaccion: '15-09-2017',
      
        },
        {
          id: 2,
          cliente: 'Ramces Gomez',
          tipoMovimiento:'pago',
          montoTotal:200,
          capitalDelPago:100,
          interesDelPago:100,
          fechaTransaccion: '15-09-2017',

      
        },
        {
          id: 3,
          cliente: 'Vladimir Gonzalez',
          tipoMovimiento:'desembolso',
          montoTotal:200,
          capitalDelPago:100,
          interesDelPago:100,
          fechaTransaccion: '15-09-2017',
          
      
        },
      ]
      
    return { clientesData,prestamosData,listaBancos,movimientosData, };
  }
}
