var Validator = Validator || {}

Validator = (function() {

	/**
	 * Resuelve algunas propiedades del objeto event.
	 * 
	 * @param {event} e
	 * 
	 * @return {Object}
	 */
	function resolve(e) {

		var character = String.fromCharCode(e.keyCode || e.charCode);

		return {
			character: String.fromCharCode(e.keyCode || e.charCode),
			code: e.keyCode || e.charCode,
			left: e.key ? (e.key == 'ArrowRight' ? true : false) : false,
			shift: e.shiftKey,
			target: e.target ? e.target : e.srcElement,
			value: e.target ? (e.target.value + character) : (e.srcElement.value + character)
		}
	}

	/**
	 * Valida por medio de la información del evento que sea un 
	 *
	 * número decimal.
	 * 
	 * @param {event} e
	 */
	function typeDouble(e) {
		var data = resolve(e);
		
		/* Validaciones para Firefox */
		if (
			(data.code == 37 && !data.shift) ||
			(data.code == 39 && data.left) ||
			(data.code == 13) ||
			(data.code == 8) 
			) {
			return;
		}
		/* */

		if (data.value.length == 1 && data.value == '.') {
			return;
		}

		if (isNaN(data.value) || data.code == 32) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
		}
	}

	/**
	 * Valida números enteros.
	 * 
	 * @param {event} e
	 */
	function typeInteger(e) {
		var data = resolve(e);

		/* Validaciones para Firefox */
		if (
			(data.code == 37 && !data.shift) ||
			(data.code == 39 && data.left) ||
			(data.code == 13) ||
			(data.code == 8) 
			) {
			return;
		}
		/* */

		if (isNaN(data.character) || data.code == 32) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
		}
	}

	/**
	 * Valida unicamente letras,acentos y ñ.
	 * 
	 * @param {event} e
	 */
	function typeLetter(e) {
		var data = resolve(e);

		/* Validaciones para Firefox */
		if (
			(data.code == 37 && !data.shift) ||
			(data.code == 39 && data.left) ||
			(data.code == 13) ||
			(data.code == 8) 
			) {
			return;
		}
		/* */

		if (data.character == '.') {
			return;
		}

		var pattern = new RegExp(/^([a-z ñáéíóú])$/, 'i');

		if (!pattern.test(data.character)) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
		} 
	}

	/**
	 * Valida un string sin caracteres especiales.
	 * 
	 * @param {event} e
	 */
	function typeString(e) {
		var data = resolve(e);

		/* Validaciones para Firefox */
		if (
			(data.code == 37 && !data.shift) ||
			(data.code == 39 && data.left) ||
			(data.code == 13) ||
			(data.code == 8) 
			) {
			return;
		}
		/* */

		if (data.character == '.') {
			return;
		}

		var pattern = new RegExp(/^([a-z ñáéíóú]|[0-9])$/, 'i');

		if (!pattern.test(data.character)) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
		}
	}

	return {
		typeDouble: typeDouble,
		typeInteger: typeInteger,
		typeLetter: typeLetter
		typeString: typeString,
	}
} ())
