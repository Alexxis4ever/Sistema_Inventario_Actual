import { getProducts, sendProduct } from '../entrada/firebase.js';

const countTotal = document.getElementById("countTotal")
const contador = document.getElementById("contador")
const envioRegistro = document.getElementById("envioRegistro")

const carrito = []
let sumas = 0;



window.addEventListener('DOMContentLoaded', async () => {
  
  // const Prcdt = {}
  getProducts((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      createCards(doc.data())
      // carrito(doc.data())
      carrito.push(doc.data())
      countTotal.textContent = sumas += Number(doc.data().quantity);
      contador.textContent = carrito.length
    })
  })
})



const fecha = document.getElementById("date")
const name = document.getElementById("name")
const cantidadProducto = document.getElementById("cantidad")
const embalaje = document.getElementById("option")

const producto = document.getElementById("producto")

const newImage = document.getElementById("image")

const table = document.getElementById("containerList")


// cloudinary

let imgSelected = ""

if (newImage) {
  newImage.addEventListener('change', (event) => {
    const currentImg = event.target.files[0]
    const objectURL = URL.createObjectURL(currentImg)
    imgSelected = objectURL
  })
}


newImage.addEventListener('click', () => {
  widget_cloudinary.open();
}, false);



// funcion para entregarme la imagen para el nuevo elemento.

let widget_cloudinary = cloudinary.createUploadWidget({
  cloudName: 'b9',
  uploadPreset: 'Inventario'
}, (err, result) => {
  if (!err && result && result.event === 'success') {
    console.log('Imagen subida con éxito', result.info);
    newImage.src = result.info.secure_url;
    imgSelected = result.info.secure_url
    console.log(imgSelected);
  }
});



// +++++++++++++++++++
if (envioRegistro) {
  envioRegistro.addEventListener('click', async () => {
    const product = {
      nameAccount: localStorage.getItem("nombre"),
      name: name.value,
      date: fecha.value,
      quantity: cantidadProducto.value,
      packages: producto.options[producto.selectedIndex].text,
      img: imgSelected
    }
    

        // validaciones
  
        if (name.value === '' && fecha.value === '' && cantidadProducto.value === '' && producto.value === '') {
          alert("Los campos estan vacios");
        } 
        
        else if (name.value === '') {
          alert("Por favor agregue nombre del producto");
        }
        
        else if (fecha.value === '') {
          alert("Por favor agregue la fecha");
        }
    
        else if (cantidadProducto.value <0) {
          alert("No se permiten valores negativos")
          cantidadProducto.value=""
        }
    
        else if (cantidadProducto.value == 0) {
          alert("No se permiten valores vacios")
          cantidadProducto.value=""
        }
      
        else if (cantidadProducto.value === '') {
          alert("Por favor inserte la cantidad de productos");
        }
      
        else if (producto.value === 'Selecciona el embalaje') {
          alert("Por favor elija el tipo de embalaje");
        } 
    
        else if (imgSelected === '') {
          alert('Por favor agregue una imagen');
        }
    
        else{
          alert("Producto registrado con exito");
          await sendProduct(product);
          name.value= ""
          fecha.value=""
          cantidadProducto.value=""
          producto.value="Selecciona el embalaje"
          location.reload(imgSelected);
        }

  })
}

function createCards(Prcdt) {

  const { name, img, quantity, date, nameAccount, packages } = Prcdt


  const containerT = document.createElement('tr');

  const tdImg = document.createElement('td');
  tdImg.className += "tdImg"
  const imgP = document.createElement('img');
  imgP.setAttribute('src', img);
  imgP.className += "productImg"

  const nameP = document.createElement('td');
  nameP.textContent = name;
  nameP.className += "nameP"


  const quantityP = document.createElement('td')
  quantityP.textContent = quantity

  const dateP = document.createElement('td');
  dateP.textContent = date;

  const account = document.createElement('td');
  account.textContent = nameAccount;

  const packagesP = document.createElement('td');
  packagesP.textContent = packages;

  table.appendChild(containerT)
  containerT.appendChild(account);
  containerT.appendChild(tdImg);
  tdImg.appendChild(imgP);
  containerT.appendChild(nameP);
  containerT.appendChild(dateP);
  containerT.appendChild(quantityP);
  containerT.appendChild(packagesP);

  const filterXPackage = document.getElementById('filterXPackage');
  filterXPackage.addEventListener('change', filterProducts);

}


// Filtros aqui

function filterProducts(embalaje) {

  const responser = embalaje.target.value === 'Carton'
  ? carrito.filter (Prcdt => Prcdt.packages === 'Carton')

  : embalaje.target.value === 'Metal'
  ? carrito.filter (Prcdt => Prcdt.packages === 'Metal')

  : embalaje.target.value === 'Plastico'
  ? carrito.filter (Prcdt => Prcdt.packages === 'Plastico')

  : embalaje.target.value === 'Vidrio'
  ? carrito.filter (Prcdt => Prcdt.packages === 'Vidrio')
  : null;

  table.innerHTML = ''
  
  responser.map(Prcdt => createCards(Prcdt));

}











// -------------



