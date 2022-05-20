
const divCelulares = document.getElementById("divCelulares")
const tablaCarrito = document.getElementById("tablaCarrito")
const totalCarrito = document.getElementById("totalCarrito")


function mostrarProductos(telefonos){
    divCelulares.innerHTML=""
    telefonos.forEach(celular => {
        divCelulares.innerHTML+=`
        <div class="card mb-4" style="width: 18rem;">
            <img src="${celular.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${celular.marca} ${celular.modelo}</h5>
                <p class="card-text">$ ${celular.precio}</p>
                <button onclick="agregarAlCarrito(${celular.id})" class="btn btn-success">Comprar</button>
            </div>
        </div>
        `
    });
}

function mostrarCarrito() {
    let carrito = capturarStorage()
    tablaCarrito.innerHTML =""
    carrito.forEach(element => {
        tablaCarrito.innerHTML+= `
        <tr>
            <td data-th="Product">
                <div class="row">
                <div class="col-sm-2 hidden-xs"><img src="${element.img}" width=64px alt="..."/></div>
                    <div class="col-sm-10">
                        <h4 class="nomargin">${element.marca} ${element.modelo}</h4>
                    </div>
                </div>
            </td>
            <td data-th="Precio">${element.precio}</td>
            <td data-th="Cantidad">
                <p class="form-control text-center">${element.cantidad}</p>
            </td>
            <td data-th="Subtotal" class="text-center">${element.precio * element.cantidad}</td>
            <td><button onclick="eliminarProductoCarrito(${element.id})" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button></td>
        </tr>
        `
    });
}

function capturarStorage(){
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorage(array){
    localStorage.setItem("carrito", JSON.stringify(array))
}

function agregarAlCarrito(id) {
    let carrito = capturarStorage()
    if (estaEnCarrito(id)){
        incrementarCant(id)
    } else {
        let productoEncontrado = telefonos.find(celular=>celular.id==id)
        carrito.push({...productoEncontrado, cantidad: 1})
        guardarStorage(carrito)
        mostrarCarrito()
    }
    mostrarCarrito()
    console.log(carrito)
    mostrarTotalCarrito()
}

function incrementarCant(id) {
    let carrito = capturarStorage()
    const indice = carrito.findIndex(celular => celular.id==id)
    carrito[indice].cantidad++
    guardarStorage(carrito)
}

function estaEnCarrito(id){
    let carrito = capturarStorage()
    return carrito.some(e=>e.id==id)
}

function eliminarProductoCarrito(id) {
    let carrito = capturarStorage()
    let resultado = carrito.filter(celular => celular.id != id)
    guardarStorage(resultado)
    console.log(resultado)
    mostrarCarrito()
    mostrarTotalCarrito()
}


function mostrarTotalCarrito() {
    //calculo el valor total
    const carrito = capturarStorage();
    const total = carrito.reduce(
      (acc, element) => acc + element.cantidad * element.precio,0
    );
    totalCarrito.innerHTML = total;
  }


mostrarCarrito()
mostrarProductos(telefonos)
mostrarTotalCarrito()