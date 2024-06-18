let enviar = document.getElementById("enviar");
let producto = document.getElementById("producto");
let precio = document.getElementById("precio");
let cantidad = document.getElementById("cantidad");
let formulario = document.getElementById("formulario");
let tabla = document.getElementById("tabla");
let impuesto = document.getElementsByName("impuesto");
let mensaje = document.getElementById("mensaje");


// variables de calculos
let totalp;
let timp;
let totalf;
let totalmaster;


// arreglo
let array = [];

enviar.addEventListener("click" , () => {
    event.preventDefault();

    // Verificamos si hay productos
    if(producto.value.length === 0 || precio.value.length === 0 || cantidad.value.length === 0)
    {
        mensaje.style.display = "flex";
        mensaje.innerHTML = "Favor de completar los campos";

        setTimeout(() => {
            mensaje.style.display = "none";
        } , 1500);
    }
    else 
    {

    mensaje.style.display = "flex";
    mensaje.innerHTML = "Producto Añadido";

    setTimeout(() => {
        mensaje.style.display = "none";
      } , 3000);
    
    totalf = 0;
    totalmaster = 0;
    

    let arrarindex = [];
    const [file] = image.files
    if (file) {
    img = `<img src="` + URL.createObjectURL(file) + `" class="imgu">`
    } else {
    img = 'Sin imagen'
    }

    totalp = cantidad.value * precio.value;
    let imp1 = totalp;
    let imp2 = totalp + (totalp * 0.05);
    let imp3 = totalp + (totalp * 0.10);

    let impu1 = 0;
    let impu2 = (totalp * 0.05);
    let impu3 = (totalp * 0.10);

    if(impuesto[0].checked)
    {
        timp = "0%: " + impu1 + "$";
        totalf = imp1;
    }
    if(impuesto[1].checked)
    {
        timp = "5%: " + impu2 + "$";
        totalf = imp2;
    }
    if(impuesto[2].checked)
    {
        timp = "10%: " + impu3 + "$";
        totalf = imp3;
    }
    tabla.innerHTML += 
    `
    <tr>
        <td>${producto.value}</td>
        <td>${cantidad.value}</td>
        <td>${precio.value}$</td>
        <td>${timp}</td>
        <td>${totalf}$</td>
        <td>${img}</td>
    </tr>
    `;
    let pro = 
    {
        nombre: producto.value,
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
    
    ttl.innerHTML = "El total es: " + totalmaster + "$";
    
    
    document.getElementById("formulario").reset();
    
    }

});


// Cambiar fondo
let main = document.getElementById("main");
let fondo = document.getElementById("fondo");

fondo.addEventListener("change" , (e) => {
    main.style.backgroundImage = `url(${e.target.value})`;
    formulario.style.background = "rgba(240, 240, 240, 0.411)";
});

let genrec = document.getElementById("genrec");
let genpdf = document.getElementById("genpdf");
let recibo = document.getElementById("recibo");

// Generar Recibo
genrec.addEventListener("click" , () => {
    let cantdp = 0;
    if(array.length === 0)
    {
        mensaje.style.display = "flex";
        mensaje.innerHTML = "No hay ningun producto :(";

        setTimeout(() => {
            mensaje.style.display = "none";
        } , 1500);
    }
    else
    {
        recibo.style.display = "flex";
        mensaje.style.display = "flex";
        mensaje.innerHTML = "Ticket generado exitosamente";

        setTimeout(() => {
            mensaje.style.display = "none";
        } , 1500);
        genpdf.style.display = "block";
        recibo.innerHTML = 
        `
        Supermecado DanielizaZzz<br>
        **************************************<br>
        Productos: <br> 
        `;
        array.forEach(dato => {
            
           recibo.innerHTML += `x${dato.cantidad} - ${dato.nombre}: ${dato.precio}$  --- Impuesto: ${dato.impuesto} <br>`; 
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