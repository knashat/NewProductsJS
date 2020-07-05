let products = [];
let time;

const addbtn = document.querySelector("#Add-product");
const quantityBtn = document.querySelector("#edit-quantity");
const deleteBtn = document.querySelector("#delete-product");
const cancelBtn = document.querySelector("#undo");
const container = document.querySelector("#container");
const inputFeild1 = document.querySelector("#product-name");
const inputFeild2 = document.querySelector("#product-quantity");
const inputFeild3 = document.querySelector("#product-type");
const inputFeild4 = document.querySelector("#new-quanitity");
const selectFeild1 = document.querySelector("#select-product");
const selectFeild2 = document.querySelector("#select-delete-product");

function valString(text) {
  if (!isNaN(text) || text === "") {
    alert("Please enter valid product name/type");
    throw new Error(`"${text}" is not a valid string!`);
  }
}

function valNumber(number) {
  if (isNaN(number) || number === "") {
    alert("Please enter valid product quantity");
    throw new Error(`"${number}" is not a valid string!`);
  }
}

function valDuplicate(productD) {
  for (let i = 0; i < products.length; i++) {
    if (productD === products[i].name) {
      alert(`Product "${productD}" already exists!`);
      throw new Error(`"${productD}" is not a valid string!`);
    }
  }
}

deleteBtn.addEventListener("click", function(myEvent) {
  myEvent.stopPropagation();

  if (products[0] !== undefined) {
    const productName = selectFeild2.value;
    deleteBtn.innerHTML = "Click Cancel to undo in 5 seconds!";
    let deleteProduct;
    for (let i = 0; i < products.length; i++) {
      if (productName === products[i].name) {
        deleteProduct = products[i];
      }
    }

    time = setTimeout(() => {
      const newProducts = products.filter(product => product !== deleteProduct);

      products = newProducts;
      renderProducts();
      deleteBtn.classList = "button-styles";
      deleteBtn.innerHTML = "Delete product";
      inputFeild4.value = "";
      inputFeild1.value = "";
      inputFeild2.value = "";
      inputFeild3.value = "";
      selectFeild1.value = "";
      selectFeild2.value = "";
    }, 5000);
  }
});

cancelBtn.addEventListener("click", function(myEvent) {
  myEvent.stopPropagation();
  if (time) {
    clearTimeout(time);
    deleteBtn.classList = "button-styles";
    deleteBtn.innerHTML = "Delete product";
    inputFeild4.value = "";
    inputFeild1.value = "";
    inputFeild2.value = "";
    inputFeild3.value = "";
    selectFeild1.value = "";
    selectFeild2.value = "";
  }
});

const renderProducts = () => {
  container.innerHTML = "";

  products.forEach(product => {
    const listProduct = document.createElement("li");
    const selectProduct = document.createElement("option");
    const selectDelProduct = document.createElement("option");
    listProduct.innerHTML = `Product: ${product.name}, Quantity: ${
      product.quantity
    }, Type: ${product.type}`;
    container.appendChild(listProduct);
    selectProduct.innerHTML = `${product.name}`;
    selectDelProduct.innerHTML = `${product.name}`;
    selectFeild1.appendChild(selectProduct);
    selectFeild2.appendChild(selectDelProduct);
  });
};

addbtn.addEventListener("click", function(myEvent) {
  myEvent.stopPropagation();

  valString(inputFeild1.value);
  valString(inputFeild3.value);
  valNumber(inputFeild2.value);
  valDuplicate(inputFeild1.value);

  const product = {
    name: inputFeild1.value,
    quantity: inputFeild2.value,
    type: inputFeild3.value
  };
  products.push(product);
  renderProducts();
  inputFeild4.value = "";
  inputFeild1.value = "";
  inputFeild2.value = "";
  inputFeild3.value = "";
  selectFeild1.value = "";
  selectFeild2.value = "";
});

quantityBtn.addEventListener("click", function(myEvent) {
  myEvent.stopPropagation();
  valNumber(inputFeild4.value);
  const productName = selectFeild1.value;
  const nQuantity = inputFeild4.value;

  for (let i = 0; i < products.length; i++) {
    if (products[i].name === productName) {
      products[i].quantity = nQuantity;
    }
  }
  renderProducts();
  inputFeild4.value = "";
  inputFeild1.value = "";
  inputFeild2.value = "";
  inputFeild3.value = "";
  selectFeild1.value = "";
  selectFeild2.value = "";
});
