let enviar = document.getElementById("enviar");
let producto = document.getElementById("producto");
let precio = document.getElementById("precio");
let cantidad = document.getElementById("cantidad");
let formulario = document.getElementById("formulario");
let tabla = document.getElementById("tabla");
let impuesto = document.getElementsByName("impuesto");
let mensaje = document.getElementById("mensaje");


let preimg = document.getElementById("preimg");

let select = document.getElementById('products');

// variables de calculos
let totalp;
let timp;
let totalf;
let totalmaster;



// arreglo
let array = [];

select.addEventListener("change" , () => {
    let txtnom = document.getElementById('txtnom');
    let image = select.options[select.selectedIndex].getAttribute('data-image');
    let txtn = select.options[select.selectedIndex].getAttribute('value');
    document.getElementById('productImage').src = image;
    txtnom.innerHTML = txtn;
});

enviar.addEventListener("click" , () => {
    event.preventDefault();
    let select = document.getElementById('products');
    let image = select.options[select.selectedIndex].getAttribute('data-image');
    let nombrep = select.options[select.selectedIndex].getAttribute('value');
    // Verificamos si hay productos
    if(precio.value.length === 0 || cantidad.value.length === 0 || nombrep === "selecciona") 
    {
        mensaje.style.display = "flex";
        mensaje.innerHTML = `Favor de llenar los campos <i style="color: rgb(247, 244, 66); margin: 10px;" class="fas fa-exclamation-triangle"></i>`;
        mensaje.style.backgroundColor = "#e06c6c";

        setTimeout(() => {
            mensaje.style.display = "none";
        } , 3000);
    }
    else 
    {

    mensaje.style.display = "flex";
    mensaje.innerHTML = `Producto Añadido <i style="color: rgb(36, 250, 100); margin: 10px;" class="fa-solid fa-check"></i>`;
    mensaje.style.backgroundColor = "rgb(96, 184, 219)";


    setTimeout(() => {
        mensaje.style.display = "none";
      } , 3000);
    
    totalf = 0;
    totalmaster = 0;
        
    totalp = cantidad.value * precio.value;
    let imp1 = totalp;
    let imp2 = totalp - (totalp * 0.05);
    let imp3 = totalp - (totalp * 0.10);

    let impu1 = 0;
    let impu2 = (totalp * 0.05);
    let impu3 = (totalp * 0.10);


    if(impuesto[0].checked)
    {
        timp = "0%: " + impu1.toFixed(1) + "$";
        totalf = imp1;
    }
    if(impuesto[1].checked)
    {
        timp = "5%: " + impu2.toFixed(1) + "$";
        totalf = imp2;
    }
    if(impuesto[2].checked)
    {
        timp = "10%: " + impu3.toFixed(1) + "$";
        totalf = imp3;
    }

    
    tabla.innerHTML += 
    `
    <tr>
        <td>${nombrep}</td>
        <td>${cantidad.value}</td>
        <td>${precio.value}$</td>
        <td>${totalp}$</td>
        <td>${timp}</td>
        <td>${totalf}$</td>
        <td><img src="${image}" alt="Imagen no encontrada :(" class="imgu"></td>
    </tr>
    `;
    let pro = 
    {
        nombre: nombrep,
        cantidad: cantidad.value,
        precio: precio.value,
        impuesto: timp,
        total: totalf
    }
    


    array.push(pro);
    // localStorage.setItem("productos", JSON.stringify(array));
    let ttl = document.getElementById("ttl");
    array.forEach(dato => {
        totalmaster += dato.total;
    });
    
    ttl.innerHTML = "El total es: " + totalmaster.toFixed(1) + "$";
    txtnom.innerHTML = "";
    document.getElementById('productImage').src = "";
    document.getElementById("form-1").reset();
    
    
    }

});


// Cambiar fondo
let main = document.getElementById("main");
let fondo = document.getElementById("fondo");



function cambiarfondo()
{
    let fondoch = document.getElementById('fondoch');
    let image = fondoch.options[fondoch.selectedIndex].getAttribute('data-image');
    main.style.backgroundImage = `url(${image})`;

}

let genrec = document.getElementById("genrec");
let genpdf = document.getElementById("genpdf");
let recibo = document.getElementById("recibo");

// Generar Recibo
genrec.addEventListener("click" , () => {
    let fecha = new Date();
    if(array.length === 0)
    {
        mensaje.style.display = "flex";
        mensaje.innerHTML = `No hay ningun producto <i style="color: rgb(247, 244, 66); margin: 10px;" class="fas fa-exclamation-triangle"></i>`;
        mensaje.style.backgroundColor = "#e06c6c";

        setTimeout(() => {
            mensaje.style.display = "none";
        } , 3000);
    }
    else
    {
        recibo.style.display = "flex";
        mensaje.style.display = "flex";
        mensaje.style.backgroundColor = "rgb(96, 184, 219)";
        genrec.style.display = "none";
        mensaje.innerHTML = `Ticket generado exitosamente <i style="color: rgb(36, 250, 100); margin: 10px;" class="fa-solid fa-check"></i>`;

        setTimeout(() => {
            mensaje.style.display = "none";
        } , 3000);
        genpdf.style.display = "block";
        recibo.innerHTML = 
        `
        ${fecha}<br>
        Supermecado DanielizaZzz<br>
        **************************************<br>
        Productos: <br> 
        `;
        array.forEach(dato => {
            
           recibo.innerHTML += `x${dato.cantidad} - ${dato.nombre}: ${dato.precio}$  --- (Impuesto: ${dato.impuesto}) <br>`; 
        });
         recibo.innerHTML += 
        `
        <br>**************************************<br>
        Total: 
        `;
        recibo.innerHTML += totalmaster + "$";
    }
    
});

function printTicket() {
    const printContents = document.querySelector('.recibo').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

function vaciar()
{
    location.reload();
}