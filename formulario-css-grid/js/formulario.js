const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	type: /^[a-zA-Z\s]{3,30}$/, // Letras y espacios, mínimo 3 y máximo 30.
	name: /^[a-zA-Z\s]{3,30}$/, // Letras y espacios, mínimo 3 y máximo 30.
	price: /^\d{1,6}(\.\d{0,2})?$/, // Números decimales con un máximo de 2 decimales y un máximo de 6 dígitos en total.
	description: /^[a-zA-Z0-9\s]{10,100}$/, // Letras, números y espacios, mínimo 10 y máximo 100 caracteres.
	stock: /^\d{1,6}$/ // Números enteros con un máximo de 6 dígitos.
}

const campos = {
	type: false,
	name: false,
	price: false,
	description: false,
	stock: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "type":
			validarCampo(expresiones.type, e.target, 'type');
		break;
		case "name":
			validarCampo(expresiones.name, e.target, 'name');
		break;
		case "price":
			validarCampo(expresiones.price, e.target, 'price');
		break;
		case "description":
			validarCampo(expresiones.description, e.target, 'description');
		break;
		case "stock":
			validarCampo(expresiones.stock, e.target, 'stock');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.type && campos.name && campos.price && campos.description && campos.stock){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
