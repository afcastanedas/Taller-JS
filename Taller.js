let Nombre=""
let Edad=""
/*const Tipo_de_documento={
    RC: "Registro_Civil",
    TI: "Tarjeta de identidad",
    CC: "Cedula de ciudadania",
    CE: "Cedula de extranjeria",
    PP: "Pasaporte",
}*/
/*Punto 3*/
let numero_de_documento=""
let Salario=""
let comisiones=""
let Total_de_horas_extras=""
let Clasificación_del_nivel_de_riesgo=""
/*Constantes*/
const Salario_minimo_legal_vigente=1750905;
const salario_minimo_integral_vigente=22761765;
const subsidio_de_transporte=249095;
const Unidad_de_valor_tributario=5237;
const salud= *0.04;
const pension= *0.04;
const riesgo1= 0.522;
const riesgo2= 1.044;
const riesgo3= 2.436;
const riesgo4= 4.350;
const riesgo5= 6.960;
const fondo_de_solidaridad= 0.01;
/*Terminar las constantes*/

/* if y else*/

if (Edad<18){
    /*No se calcula*/
};
if (Edad>=18 && Edad<=25){
    /*No se calcula porque es beneficiario*/
};

else if (Edad>25 && Edad<=60){
    /*Se calculan obligaciones*/
};

else if (Edad>60){
    /*Es pensionado*/
};

/*Calculo Variables*/

let calculo_IBC= Salario+comisiones+(Total_de_horas_extras*Salario/240)
let Calculo_de_salud= Salario*0.04
let calculo_de_auxilio_de_transporte=



