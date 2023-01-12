/* ============ Funciones de Encriptación/Desencriptación ============ */
function prepareSpace(frase) {
    /* Insertamos textarea con el mensaje encriptado/desencriptado y boton de copiar */
    document.getElementById("view-section").innerHTML = `
        <textarea id="output" class="output" rows="8" readonly></textarea>
        <button class="btn" onclick="copiar()">Copiar</button>
    `;
}

function validacion(frase) {
    /* Expresión regular para encontrar mayúsculas y carácteres con acento */
    let regex = /[A-ZÀ-ú]/;
    return (!regex.test(frase) && frase != '');
}

function encriptar(frase) {
    /* Remplazamos todas las vocales por las claves de encriptación */
    let newFrase = frase.replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    /* Devolvemos la frase encriptada */
    return newFrase;
}

function desencriptar(frase) {
    /* Remplazamos las letras encriptadas por sus respectivas vocales*/
    let newFrase = frase.replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
    
    /* Devolvemos la frase desencriptada */
    return newFrase;
}

function mostrarEncriptado() {
    /* Obtenemos el contenido de Textarea */
    let frase = document.getElementById("input").value;

    if(validacion(frase)) {
        /* Mostramos el elemento html con el contenido del mensaje */
        prepareSpace(frase);

        /* Agregamos la frase encriptada al elemento html */
        document.getElementById("output").value = encriptar(frase);
    } else {
        customAlert('Entrada incorrecta', 'Parece que su mensaje está vacío o contiene mayúsculas y/o caracteres especiales.', true);
    }
}

function mostrarDesencriptado() {
    /* Obtenemos el contenido de Textarea */
    let frase = document.getElementById("input").value;

    if(validacion(frase)) {
        /* Mostramos el elemento html con el contenido del mensaje */
        prepareSpace(frase);
        
        /* Agregamos la frase desencriptada al elemento html */
        document.getElementById("output").value = desencriptar(frase);
    } else {
        customAlert('Entrada incorrecta', 'Parece que su mensaje está vacío o quizá contiene mayúsculas y/o acentos, evítelos por favor.', true);
    }
}

/* ============ Funciones de copiar/pegar/borrar ============ */
function copiar() {
    /* Obtenemos el texto a copiar */
    let copiedText = document.getElementById("output").value;

    /* Lo copiamos al portapapeles */
    navigator.clipboard.writeText(copiedText);

    /* Mostramos alerta de texto copiado */
    copyAlert();
}

function limpiar() {
    /* Seteamos el valor del input a '' */
    document.getElementById("input").value = '';
}

/* ============ Funciones de Alertas personalizadas ============ */
function copyAlert() {
    let bg = document.getElementById("bg");
    bg.insertAdjacentHTML('beforeend', `
    <span id="copy-alert" class="copy-alert">Texto Copiado</span>
    `);

    setTimeout(() => bg.removeChild(document.getElementById("copy-alert")), 3000);
}

function customAlert(title, message, acceptBtn) {
    let bg = document.getElementById("bg");
    bg.insertAdjacentHTML('beforeend', '<div id="custom-alert" class="custom-alert"><div>');

    /* Creando fondo de la alerta */
    let alertBackground = document.getElementById("custom-alert");


    /* Titulo */
    alertBackground.insertAdjacentHTML('beforeend', '<h1 id="title">' + title + '</h1>');
    let titleH1 = document.getElementById('title');
    titleH1.style.fontSize = '1.5rem';
    titleH1.style.lineHeight = '120%';

    /* Mensaje */
    alertBackground.insertAdjacentHTML('beforeend', '<p id="message">' + message + '</p>');
    let messageP = document.getElementById("message");
    messageP.style.lineHeight = '120%';
    messageP.style.margin = '1rem 0';

    /* Botón */
    if(acceptBtn) {
        alertBackground.insertAdjacentHTML("beforeend", '<button id="acceptBtn" class="btn" onclick="closeAlert()">Aceptar</button>');
        let btnAccept = document.getElementById("acceptBtn");
        btnAccept.style.width = '50%';
    }

    /* Desabilitando elementos */
    let main = document.querySelector("main");
    let footer = document.querySelector("footer");
    main.style.pointerEvents = 'none';
    footer.style.pointerEvents = 'none';
}

function closeAlert() {
    let alert = document.getElementById("custom-alert");
    let alertParent = document.getElementById("bg");
    let main = document.querySelector("main");
    let footer = document.querySelector("footer");

    /* Eliminamos alerta del elemento padre */
    alertParent.removeChild(alert);

    /* Habilitamos los elementos principales */
    main.style.pointerEvents = 'auto';
    footer.style.pointerEvents = 'auto';

}

/* ============ Funciones para el background ============ */

function createBackground() {
    let body = document.getElementById("body");
    let height = window.innerHeight;

    /* Creamos un lienzo para el fondo */
    body.insertAdjacentHTML('beforeend', '<div id="bg"></div>');
    let bg = document.getElementById("bg");

}


