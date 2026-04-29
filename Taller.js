let nombre="";
let edad=0;
/*const Tipo_de_documento={
    RC: "Registro_Civil",
    TI: "Tarjeta de identidad",
    CC: "Cedula de ciudadania",
    CE: "Cedula de extranjeria",
    PP: "Pasaporte",
}*/
/*Punto 3*/
let numero_de_documento="";
let salario=0;
let comisiones=0;
let total_de_horas_extras=0;
let clasificacion_del_nivel_de_riesgo=0;

nombre=prompt("Ingrese su nombre");
edad=parseInt(prompt("Ingrese su edad"));
numero_de_documento=parseInt(prompt("Ingrese su numero de documento"));
salario=parseInt(prompt("Ingrese su salario"));
comisiones=parseInt(prompt("Ingrese el valor de sus comisiones"));
total_de_horas_extras=parseInt(prompt("Ingrese el total de horas extras trabajadas en el mes"));
clasificacion_del_nivel_de_riesgo=parseInt(prompt("Ingrese su clasificacion del nivel de riesgo (1-5)"));

/*Constantes*/
const ibc= 0.70;
const Salario_minimo_legal_vigente=1750905;
const salario_minimo_integral_vigente=22761765;
const subsidio_de_transporte=249095;
const Unidad_de_valor_tributario=5237;
const salud= 0.04;
const pension= 0.04;
const fondo_de_solidaridad= 0.01;

const nivelesDeRiesgo = [
    { nombre: "Riesgo 1", valor: 0.522 },
    { nombre: "Riesgo 2", valor: 1.044 },
    { nombre: "Riesgo 3", valor: 2.436 },
    { nombre: "Riesgo 4", valor: 4.350 },
    { nombre: "Riesgo 5", valor: 6.960 }
];  
/*Terminar las constantes*/

/* if y else*/
function validarUsuario(){
if (edad<18){
    alert("no se calcula porque es menor de edad");
} else if (edad>=18 && edad<=25){
    alert("no se calcula porque es beneficiairio");
} else if (edad>25 && edad<=60){
    alert("se calcula las cotizaciones");
} else if (edad>60){
    alert("se calcula pension por ser mayor de 60 años");
};
}
/*Calculo Variables*/

let calculo_IBC= ibc * (salario + comisiones + total_de_horas_extras);
let Calculo_de_salud= calculo_IBC * salud;
let calculo_de_auxilio_de_transporte= subsidio_de_transporte;
let calculo_de_pension= calculo_IBC * pension;
