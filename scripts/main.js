// Función para mostrar u ocultar la lista de productos
function toggleProductList(group) {
  const productList = document.querySelector(`.product-list.${group}`);
  productList.style.display = productList.style.display === 'block' ? 'none' : 'block';
}

// Función para calcular el presupuesto total de todos los productos
function calculateTotal() {
  const productGroups = document.querySelectorAll('.product-group');
  let total = 0;

  productGroups.forEach((group) => {
    const items = group.querySelectorAll('.quantity-value');
    items.forEach((item) => {
      const productName = item.closest('li').querySelector('.product-info span').textContent;
      const productPrice = parseInt(productName.match(/[\d]+/)[0]);
      const quantity = parseInt(item.textContent);
      total += productPrice * quantity;
    });
  });

  return total;
}

// Función para modificar la cantidad del producto
function modifyQuantity(button, amount) {
  const quantityValue = button.parentElement.querySelector('.quantity-value');
  let currentValue = parseInt(quantityValue.textContent);
  currentValue += amount;

  if (currentValue < 0) {
    currentValue = 0;
  } else if (currentValue > 10) {
    currentValue = 10;
  }

  quantityValue.textContent = currentValue;
}

// Función para actualizar el total del presupuesto
function updateTotal() {
  const totalElement = document.getElementById('resultado-presupuesto');
  const total = calculateTotal();
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Función para limpiar las selecciones de todos los productos
function clearAllSelections() {
  const quantityValues = document.querySelectorAll('.quantity-value');

  quantityValues.forEach((value) => {
    value.textContent = 0;
  });

  updateTotal();
}

document.addEventListener('DOMContentLoaded', () => {
  // Asignar funcionalidad a los botones de aumentar y disminuir cantidad
  const plusButtons = document.querySelectorAll('.quantity-btn.plus-btn');
  const minusButtons = document.querySelectorAll('.quantity-btn.minus-btn');

  plusButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      modifyQuantity(button, 1);
    });
  });

  minusButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      modifyQuantity(button, -1);
    });
  });

  // Evento para actualizar el total cuando se cambia la cantidad
  const quantityValues = document.querySelectorAll('.quantity-value');

  quantityValues.forEach((value) => {
    value.addEventListener('input', () => {
      let inputValue = parseInt(value.textContent);

      if (isNaN(inputValue) || inputValue < 0) {
        value.textContent = 0;
        inputValue = 0;
      } else if (inputValue > 10) {
        value.textContent = 10;
        inputValue = 10;
      }

      // No actualizamos el total aquí para evitar que se muestre mientras se aumenta
    });
  });

  // Evento para calcular el presupuesto
  const btnCalcularPresupuestoEl = document.getElementById('btn-calcular-presupuesto');
  btnCalcularPresupuestoEl.addEventListener('click', () => {
    updateTotal(); // Se actualiza el total solo cuando se hace clic en "Calcular Presupuesto"
  });

  // Evento para limpiar el presupuesto
  const btnLimpiarPresupuestoEl = document.getElementById('btn-limpiar-presupuesto');
  btnLimpiarPresupuestoEl.addEventListener('click', clearAllSelections);
});