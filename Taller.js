let nombre=""
let edad=0
let tipo_de_documento= ""
let numero_de_documento= ""
/*const Tipo_de_documento={
    RC: "Registro_Civil",
    TI: "Tarjeta de identidad",
    CC: "Cedula de ciudadania",
    CE: "Cedula de extranjeria",
    PP: "Pasaporte",
}*/
/*Punto 3*/
let salario= 0
let comisiones= 0
let total_de_horas_extras=0
let clasificacion_del_nivel_de_riesgo=0

/*Formularios*/ 
const formularioDatosPersonales = document.getElementById('formularioDatosPersonales')
const formularioSalario = document.getElementById('formularioSalario')
const formularioPension = document.getElementById("formularioPension");

formularioSalario.addEventListener('submit', (event) => {
    event.preventDefault();
    salario=parseInt(document.getElementById("salario").value);
    comisiones=parseInt(document.getElementById("comisiones").value);
    total_de_horas_extras=parseInt(document.getElementById("total_de_horas_extras").value);
    clasificacion_del_nivel_de_riesgo=parseInt(document.getElementById("niveles_de_riesgo").value);

    realizarCalculos(salario, comisiones, total_de_horas_extras, clasificacion_del_nivel_de_riesgo)

})

formularioPension.addEventListener('submit', (event) => {
    event.preventDefault();
    mesadaPensional=parseInt(document.getElementById("mesadaPensional").value);

    realizarCalculosPension(mesadaPensional)

})

formularioDatosPersonales.addEventListener('submit', (event) => {
    event.preventDefault();
    nombre=document.getElementById("nombre").value;
    edad=parseInt(document.getElementById("edad").value);
    tipo_de_documento=document.getElementById("tipo_de_documento").value;
    numero_de_documento= document.getElementById("numero_de_documento").value;
    validarPerfil(edad)
})


/*Reemplazo de prompts
nombre=prompt("Ingrese su nombre");
edad=parseInt(prompt("Ingrese su edad"));
numero_de_documento=parseInt(prompt("Ingrese su numero de documento"));
salario=parseInt(prompt("Ingrese su salario"));
comisiones=parseInt(prompt("Ingrese el valor de sus comisiones"));
total_de_horas_extras=parseInt(prompt("Ingrese el total de horas extras trabajadas en el mes"));
clasificacion_del_nivel_de_riesgo=parseInt(prompt("Ingrese su clasificacion del nivel de riesgo (1-5)"));
*/

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
    { nombre: "Riesgo 1", valor: 0.00522 },
    { nombre: "Riesgo 2", valor: 0.01044 },
    { nombre: "Riesgo 3", valor: 0.02436 },
    { nombre: "Riesgo 4", valor: 0.04350 },
    { nombre: "Riesgo 5", valor: 0.06960 }
];
/*Terminar las constantes*/

/* if y else*//*
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
}**/
/*Calculo Variables*/

function realizarCalculos(salario, comisiones, horasExtras, nivelDeRiesgo) {
    let calculoIBC= ibc * (salario + comisiones + horasExtras);
    let CalculoSalud= calculoIBC * salud;
    let calculoAuxilioDeTransporte= subsidio_de_transporte;
    let calculoPension= calculoIBC * pension;

    console.log(calculoIBC, CalculoSalud, calculoAuxilioDeTransporte, calculoPension)
}

function realizarCalculosPension(mesada) {
    let calculoIBC= ibc * mesada;
    let CalculoSalud= calculoIBC * salud;

    console.log(calculoIBC, CalculoSalud)
}

/*Punto 2 validar perfil*/

function validarPerfil(edad) {

    let mensaje = document.getElementById("mensaje");

    if (isNaN(edad) || edad <= 0) {
        mensaje.textContent = "Por favor ingrese una edad válida.";
        return;
    }

    if (edad < 18) {
        mensaje.textContent = "El usuario es menor de edad. No puede continuar ni calcular prestaciones.";
        return;
    }

    if (edad < 25) {
        mensaje.textContent = "El usuario se clasifica como beneficiario por cotizante. No puede continuar.";
        return;
    }

    if (edad >= 60) {
        mensaje.textContent = "El usuario tiene 60 años o más. Solo se calculará el pago de pensión.";
        formularioPension.style.display = "block";
        formularioDatosPersonales.style.display = "none";
        return;
    }

    mensaje.textContent = "El usuario puede continuar con el cálculo de obligaciones laborales.";
    formularioSalario.style.display = "block";
    formularioDatosPersonales.style.display = "none";
}
