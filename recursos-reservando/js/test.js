var expect = chai.expect;
describe('Test de la funcion reservarHorario()', function(){

   	var restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])


    it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.', function(){
       restaurant.reservarHorario("13:00");
       expect(restaurant.horarios).not.to.be.contain("13:00"); 
    })
    it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', function(){
    	var arrayHorarios= restaurant.horarios;
    	restaurant.reservarHorario("34:00");
    	expect(restaurant.horarios).to.eql(arrayHorarios);
    })
    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.", function(){
    	var arrayHorarios= restaurant.horarios;
    	restaurant.reservarHorario();
    	expect(restaurant.horarios).to.eql(arrayHorarios);
    })
    it("Cuando se reserva un horario el array disminuye en uno", function(){
    	var largoarray = restaurant.horarios.length;
    	restaurant.reservarHorario("15:30");
    	expect(restaurant.horarios.length).to.eql(largoarray-1);
    })

})

describe("Test de la funcion obtenerPuntuacion()", function(){
	 var restaurant1 = new Restaurant(11, "Frogburguer", "Hamburguesa", "París", ["12:00", "15:00", "17:30"], "../img/hamburguesa1.jpg", [9, 8, 5, 2, 9]);
	 it("El promedio de las calificaciones se resuelve correctamente", function(){
	 	var promedio = restaurant1.obtenerPuntuacion();
	 	expect(promedio).to.eql(6.6);
	 	///////////////////////////////DOBLE CHEQUEO///////////////////////////////////7
	 /*	restaurant1.calificaciones = [2,2,4,4];
	    promedio = restaurant1.obtenerPuntuacion();
	 	expect(promedio).to.eql(3);*/
	 })

	 it("Si no tiene calificacion el promedio es 0", function(){
	 	restaurant1.calificaciones = [];
	 	var promedio = restaurant1.obtenerPuntuacion();
	 	expect(promedio).to.eql(0);

	 })

	 it("Si todas las calificaciones son 0 el promedio es 0", function(){
	 	restaurant1.calificaciones = [0,0,0,0,0];
	 	var promedio = restaurant1.obtenerPuntuacion();
	 	expect(promedio).to.eql(0);

	 })
})

describe("Test de la funcion calificar()", function(){
	 var restaurant2 = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", []);

	 it("Las calificaciones se agregan todas en orden correctamente", function(){
	 	restaurant2.calificar(6);
	 	restaurant2.calificar(4);
	 	restaurant2.calificar(8);

	 	expect(restaurant2.calificaciones).to.eql([6,4,8]);
	 })

	 it("Al agregar una calificacion no permitida (Menor a 1 o mayor a 10) esta no se cuenta", function(){
	 	restaurant2.calificaciones = [];
	 	restaurant2.calificar(9);
	 	restaurant2.calificar(2);
	    restaurant2.calificar(34);
	    restaurant2.calificar(-20);
	 	restaurant2.calificar(7);
	 
	 	expect(restaurant2.calificaciones).to.eql([9,2,7]);
	 })
})

describe("Test de la funcion buscarRestaurante()", function(){
	var listadoTest = [
	new Restaurant(1, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
    new Restaurant(2, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
    new Restaurant(3, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
  	]

	var listado = new Listado(listadoTest);

	it("Se verifica que el id tome el restaurante correspondiente", function(){
		restauranteGuardado = listado.buscarRestaurante(1);
    	expect(restauranteGuardado.id).to.eql(1);
    	expect(restauranteGuardado.nombre).to.eql("Byron Hoxton");
	})    

	it("Si se ingresa un id inexistente da la alerta correspondiente", function(){
		alerta = listado.buscarRestaurante(6);
    	expect(alerta).to.eql("No se ha encontrado ningún restaurant");
	})    
})

describe("Test de la funcion obtenerRestaurantes()", function(){
	var listadoTest1 = [
	new Restaurant(1, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
    new Restaurant(2, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:00"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
    new Restaurant(3, "Maison Kayser", "Ensalada", "Londres", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
  	]

	var listado = new Listado(listadoTest1);

	it("Se testea la busqueda por rubro", function(){
		var restauranteGuardado = listado.obtenerRestaurantes("Ensalada",null,null);
		expect(restauranteGuardado[0].rubro).to.eql("Ensalada");
		expect(restauranteGuardado).to.lengthOf(2);
	})    

	it("Se testea la busqueda por ciudad", function(){
		var restauranteGuardado = listado.obtenerRestaurantes(null,"Londres",null);
		expect(restauranteGuardado[0].ubicacion).to.eql("Londres");
		expect(restauranteGuardado).to.lengthOf(2);
	})   

	it("Se testea la busqueda por horario", function(){
		var restauranteGuardado = listado.obtenerRestaurantes(null,null,"14:00");
		expect(restauranteGuardado[0].horarios).to.include("14:00");
		expect(restauranteGuardado).to.lengthOf(2);
	})   
})

describe("Test de Reservas", function(){
	var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
	var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 10), 2, 150, "DES200");

	it("Testeo del precio Base", function(){
		expect(reserva1.calcularBaseReserva()).to.eql(2800);
		expect(reserva2.calcularBaseReserva()).to.eql(300);

	})

	it("Testeo del precio final", function(){
		expect(reserva1.calcularPrecioFinal()).to.eql(2310);
		expect(reserva2.calcularPrecioFinal()).to.eql(100);
	})
})







