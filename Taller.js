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
    let mesadaPensional=parseInt(document.getElementById("mesadaPensional").value);

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
    let resultados = document.getElementById("resultados");

    if (isNaN(salario) || salario < 0) {
        resultados.innerHTML = "Ingrese un salario válido.";
        return;
    }

    if (isNaN(comisiones) || comisiones < 0) {
        resultados.innerHTML = "Ingrese un valor válido para comisiones.";
        return;
    }

    if (isNaN(horasExtras) || horasExtras < 0) {
        resultados.innerHTML = "Ingrese un valor válido para horas extras.";
        return;
    }

    if (isNaN(nivelDeRiesgo) || nivelDeRiesgo < 1 || nivelDeRiesgo > 5) {
        resultados.innerHTML = "Seleccione un nivel de riesgo válido.";
        return;
    }

    let totalDevengado = salario + comisiones + horasExtras;

    let calculoIBC = totalDevengado * ibc;

    let calculoSalud = calculoIBC * salud;
    let calculoPension = calculoIBC * pension;

    let calculoAuxilioDeTransporte = 0;

    if (salario <= 2 * Salario_minimo_legal_vigente) {
        calculoAuxilioDeTransporte = subsidio_de_transporte;
    }

    let calculoFondoSolidaridad = 0;

    if (calculoIBC >= 4 * Salario_minimo_legal_vigente) {
        calculoFondoSolidaridad = calculoIBC * fondo_de_solidaridad;
    }

    let tarifaARL = nivelesDeRiesgo[nivelDeRiesgo - 1].valor;
    let calculoARL = calculoIBC * tarifaARL;

    let retencionFuente = calcularRetencionFuente(
        totalDevengado,
        calculoSalud,
        calculoPension
    );

    let ingresosTotales =
        salario +
        comisiones +
        horasExtras +
        calculoAuxilioDeTransporte;

    let deduccionesTotales =
        calculoSalud +
        calculoPension +
        calculoFondoSolidaridad +
        calculoARL +
        retencionFuente;

    let totalFinal = ingresosTotales - deduccionesTotales;

    resultados.innerHTML = `
        <h2>Resultados</h2>

        <p><strong>Salario:</strong> ${formatoCOP(salario)}</p>
        <p><strong>Comisiones:</strong> ${formatoCOP(comisiones)}</p>
        <p><strong>Horas extras:</strong> ${formatoCOP(horasExtras)}</p>
        <p><strong>Total devengado:</strong> ${formatoCOP(totalDevengado)}</p>

        <p><strong>IBC:</strong> ${formatoCOP(calculoIBC)}</p>
        <p><strong>Auxilio de transporte:</strong> ${formatoCOP(calculoAuxilioDeTransporte)}</p>

        <h3>Deducciones</h3>
        <p><strong>Salud:</strong> ${formatoCOP(calculoSalud)}</p>
        <p><strong>Pensión:</strong> ${formatoCOP(calculoPension)}</p>
        <p><strong>Fondo de solidaridad:</strong> ${formatoCOP(calculoFondoSolidaridad)}</p>
        <p><strong>ARL:</strong> ${formatoCOP(calculoARL)}</p>
        <p><strong>Retención en la fuente:</strong> ${formatoCOP(retencionFuente)}</p>

        <h3>Total</h3>
        <p><strong>Ingresos totales:</strong> ${formatoCOP(ingresosTotales)}</p>
        <p><strong>Deducciones totales:</strong> ${formatoCOP(deduccionesTotales)}</p>
        <p><strong>Total final:</strong> ${formatoCOP(totalFinal)}</p>
    `;
}

function realizarCalculosPension(mesada) {
    let resultados = document.getElementById("resultados");

    if (isNaN(mesada) || mesada < 0) {
        resultados.innerHTML = "Ingrese una mesada pensional válida.";
        return;
    }

    let calculoPension = mesada * pension;

    resultados.innerHTML = `
        <h2>Resultado de pensión</h2>
        <p><strong>Mesada pensional:</strong> ${formatoCOP(mesada)}</p>
        <p><strong>Pago de pensión:</strong> ${formatoCOP(calculoPension)}</p>
    `;
}

function calcularRetencionFuente(totalDevengado, calculoSalud, calculoPension) {
    let ingresoLaboralGravado = totalDevengado - calculoSalud - calculoPension;

    if (ingresoLaboralGravado <= 0) {
        return 0;
    }

    let ingresoEnUVT = ingresoLaboralGravado / Unidad_de_valor_tributario;

    let impuestoUVT = 0;

    if (ingresoEnUVT <= 95) {
        impuestoUVT = 0;
    } else if (ingresoEnUVT <= 150) {
        impuestoUVT = (ingresoEnUVT - 95) * 0.19;
    } else if (ingresoEnUVT <= 360) {
        impuestoUVT = ((ingresoEnUVT - 150) * 0.28) + 10;
    } else if (ingresoEnUVT <= 640) {
        impuestoUVT = ((ingresoEnUVT - 360) * 0.33) + 69;
    } else if (ingresoEnUVT <= 945) {
        impuestoUVT = ((ingresoEnUVT - 640) * 0.35) + 162;
    } else if (ingresoEnUVT <= 2300) {
        impuestoUVT = ((ingresoEnUVT - 945) * 0.37) + 268;
    } else {
        impuestoUVT = ((ingresoEnUVT - 2300) * 0.39) + 770;
    }

    return impuestoUVT * Unidad_de_valor_tributario;
}

/*Punto 2 validar perfil*/

function validarPerfil(edad) {
    let mensaje = document.getElementById("mensaje");

    if (nombre.trim() === "") {
        mensaje.textContent = "Por favor ingrese su nombre.";
        return;
    }

    if (isNaN(edad) || edad <= 0) {
        mensaje.textContent = "Por favor ingrese una edad válida.";
        return;
    }

    if (numero_de_documento.trim() === "") {
        mensaje.textContent = "Por favor ingrese su número de documento.";
        return;
    }

    if (tipo_de_documento === "") {
        mensaje.textContent = "Por favor seleccione un tipo de documento.";
        return;
    }

    if (edad < 7 && tipo_de_documento !== "RC") {
        mensaje.textContent = "Para menores de 7 años corresponde RC - Registro Civil.";
        return;
    }

    if (edad >= 7 && edad < 18 && tipo_de_documento !== "TI") {
        mensaje.textContent = "Para usuarios entre 7 y 17 años corresponde TI - Tarjeta de Identidad.";
        return;
    }

    if (edad >= 18 && (tipo_de_documento === "RC" || tipo_de_documento === "TI")) {
        mensaje.textContent = "Para mayores de edad no corresponde usar RC ni TI.";
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
