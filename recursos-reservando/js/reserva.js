
var Reserva = function( horario, cantPersonas, precioPersona, codDescuento) {
    this.horario = horario;
    this.cantPersonas = cantPersonas;
    this.precioPersona = precioPersona;
    this.codDescuento = codDescuento;
}

Reserva.prototype.calcularBaseReserva = function(){
	return this.cantPersonas*this.precioPersona;
}


Reserva.prototype.calcularPrecioFinal = function(){
	  var precioBase = this.calcularBaseReserva();
	  var fecha = this.horario.getDay();
    var hora = this.horario.getHours();
    ////////////////////////
    var adicional = this.adicionales(hora, fecha, precioBase);
    var descuentos = this.descuentos(this.cantPersonas, this.codDescuento);
	  ///////////////
  	console.log("Valores para precio final:" + precioBase + " " + adicional+ " "+ descuentos)
  	var precioFinal = precioBase + adicional -descuentos;
    console.log("Precio Final:" + precioFinal);
  	return precioFinal;
}

Reserva.prototype.descuentos = function(cantidad, codigo){
var descuento = 0;
  if(cantidad >= 4 && cantidad < 6){
    descuento += (this.calcularBaseReserva()*5)/100;}

  if(cantidad >= 6 && cantidad <8){
    descuento += (this.calcularBaseReserva()*10)/100;}

  if(cantidad >= 8){
    descuento += (this.calcularBaseReserva()*15)/100;
	}

  if(codigo == "DES15"){
    descuento += calcularPorcentaje(precioBase,15)}

  if(codigo == "DES200"){
    descuento += 200}
    
  if(codigo == "DES1"){
    descuento += this.precioPersona}
     console.log("Descuento:" + descuento)	
  return descuento;


}

Reserva.prototype.adicionales = function(hora,fecha,precioBase){
	
  var adicional;

  if(hora == 13 || hora == 20){
    adicional += (this.calcularBaseReserva()*5)/100;
	}
	else{
		adicional = 0;
	}
  console.log(fecha);
 
  if (fecha == 0 || fecha== 5 || fecha== 6){
    adicional += (this.calcularBaseReserva()*10)/100;
  }
  else{
    adicional = 0;
  }
  console.log("Adicional:" + adicional);
  return adicional;
}
