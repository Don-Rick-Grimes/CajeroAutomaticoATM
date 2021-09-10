var numeroMonto = document.getElementById("numero_Monto");
var botonSacarDinero = document.getElementById("boton_Sacar_Dinero");
var parrafo1 = document.getElementById("parrafo_1");
var parrafo2 = document.getElementById("parrafo_2");

var imagenes = {
  100000:"Images/billete100Mil.png",
  50000:"Images/billete50Mil.png",
  20000:"Images/billete20Mil.webp",
  10000:"Images/billete10Mil.webp",
  5000:"Images/billete5Mil.webp",
  2000:"Images/billete2Mil.webp",
  1000:"Images/billeteMil.jpg"
};
var caja = [];
caja.push(new Billete(100000,3));
caja.push(new Billete(50000,2));
caja.push(new Billete(20000,2));
caja.push(new Billete(10000,2));
caja.push(new Billete(5000,2));
caja.push(new Billete(2000,2));
caja.push(new Billete(1000,2));


var dineroCaja = 0;
parrafo1.innerHTML = 'Contamos con denominaciones de ';
for(var b of caja)
{
  parrafo1.innerHTML+=b.valor+', ';
  dineroCaja+=b.valor*b.cantidad;
}
parrafo1.innerHTML+='<br/> En el cajero hay un total de: '+ dineroCaja +" pesos colombianos.";


botonSacarDinero.addEventListener("click",sacarDinero);



function sacarDinero()
{
  this.entregado = [];
  this.cantidadDenominacion;
  this.monto = parseInt(numeroMonto.value);
  console.log("Dinero a entregar: " + this.monto);
  parrafo2.innerHTML='<hr/>';
  if(this.monto<=dineroCaja)
  {
    for(var denominacion of caja)
    {
      this.cantidadDenominacion = Math.floor(this.monto/denominacion.valor);
      if(this.cantidadDenominacion<=denominacion.cantidad)
      {
        this.entregado.push(new Billete(denominacion.valor,this.cantidadDenominacion));
        this.monto-=denominacion.valor*this.cantidadDenominacion;
      }
      else
      {
        this.entregado.push(new Billete(denominacion.valor,denominacion.cantidad));
        this.monto-=denominacion.valor*denominacion.cantidad;
      }
    }

    if(this.monto==0)
    {
      console.log("Transaccion Exitosa");
      parrafo2.innerHTML += "Transaccion Exitosa, retira tu dinero:<br>";
      for(var e of this.entregado)
      {
        if(e.cantidad>0)
        {
          for(var i=1;i<=e.cantidad;i++)
          {
              parrafo2.innerHTML+='<img src="'+e.srcImage+'">';
          }
        }

      }
      /*for(var indiceDenominacion in caja)
      {
        caja[indiceDenominacion].cantidad-=entregado[indiceDenominacion].cantidad;
      }*/
    }
    else
    {
      console.log("No se le puede suministrar esa suma de dinero<br/>");
      parrafo2.innerHTML += "No se le puede suministrar esa suma de dinero con las denominaciones que maneja este cajero.";
    }
    console.log("Habia disponible en caja: ",caja);
    console.log("Se entrego: ", this.entregado);
    parrafo2.innerHTML+='<hr/>';
  }
  else
  {
      parrafo2.innerHTML += "No hay suficiente dinero en el cajero para la transaccion<hr/>";
  }
}
