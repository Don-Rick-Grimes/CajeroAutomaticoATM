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
caja.push(new Billete(50000,3));
caja.push(new Billete(20000,3));
caja.push(new Billete(10000,3));
caja.push(new Billete(5000,3));
caja.push(new Billete(2000,3));
caja.push(new Billete(1000,3));


var dineroCaja;
mostrarSaldo();


botonSacarDinero.addEventListener("click",sacarDinero);

function mostrarSaldo()
{
  dineroCaja = 0;
  parrafo1.innerHTML = 'En el cajero hay:<br/> ';
  for(var b of caja)
  {
    dineroCaja+=b.valor*b.cantidad;
    if(b.cantidad>0)
    {
      parrafo1.innerHTML+='<strong>'+b.cantidad+'</strong>x<img src="'+b.srcImage+'">&nbsp';
    }
  }
  parrafo1.innerHTML+='<br/><h2> Saldo cajero: '+ dineroCaja +" pesos.</h2>";
}

function sacarDinero()
{
  this.entregado = [];
  this.cantidadDenominacion;
  this.monto = parseInt(numeroMonto.value);
  console.log("Dinero a entregar: " + this.monto);
  parrafo2.innerHTML+='<hr/>';
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
      parrafo2.innerHTML += "Transaccion Exitosa, retira tu dinero("+parseInt(numeroMonto.value)+" pesos):<br>";
      for(var e of this.entregado)
      {
        if(e.cantidad>0)
        {
          for(var i=1;i<=e.cantidad;i++)
          {
              parrafo2.innerHTML+='<img src="'+e.srcImage+'">&nbsp';
          }
        }

      }
      for(var indiceDenominacion in caja)
      {
        caja[indiceDenominacion].cantidad-=this.entregado[indiceDenominacion].cantidad;
      }
    }
    else
    {
      console.log("No se le puede suministrar esa suma de dinero<br/>");
      parrafo2.innerHTML += "No se le puede suministrar esa suma de dinero con las denominaciones que tiene este cajero.";
    }
    console.log("Habia disponible en caja: ",caja);
    console.log("Se entrego: ", this.entregado);
    parrafo2.innerHTML+='<hr/>';
    mostrarSaldo();
  }
  else
  {
      parrafo2.innerHTML += "No hay suficiente dinero en el cajero para la transaccion<hr/>";
  }
}
