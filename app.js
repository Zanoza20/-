document.addEventListener('DOMContentLoaded', function() {
  const addProductForm = document.getElementById('addProductForm');
  const productList = document.getElementById('списокТоварів');
  const searchInput = document.getElementById('пошук');
  const sortSelect = document.getElementById('сортування');
  const clearButton = document.getElementById('очистити');

  let products = JSON.parse(localStorage.getItem('products')) || [];

  // оновлення списку товарів
  function updateProductList() {
    productList.innerHTML = '';

    products.forEach(function(product, index) {
      const div = document.createElement('div');
      div.classList.add('product');

      const manufacturerSpan = document.createElement('span');
      manufacturerSpan.textContent = 'Виробник: ' + product.виробник;

      const modelSpan = document.createElement('span');
      modelSpan.textContent = 'Модель: ' + product.модель;

      const typeSpan = document.createElement('span');
      typeSpan.textContent = 'Тип: ' + product.тип;

      const storageSpan = document.createElement('span');
      storageSpan.textContent = 'Об\'єм пам\'яті: ' + product.обсяг + ' ГБ';

      const speedClassSpan = document.createElement('span');
      speedClassSpan.textContent = 'Speed Class: ' + product.speedClass;

      const readSpeedSpan = document.createElement('span');
      readSpeedSpan.textContent = 'Максимальна швидкість читання: ' + product.швидкістьЧитання + ' МБ/с';

      const writeSpeedSpan = document.createElement('span');
      writeSpeedSpan.textContent = 'Максимальна швидкість запису: ' + product.швидкістьЗапису + ' МБ/с';

      const editButton = document.createElement('button');
      editButton.textContent = 'Редагувати';
      editButton.addEventListener('click', function() {
        editProduct(index);
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Видалити';
      deleteButton.addEventListener('click', function() {
        deleteProduct(index);
      });

      div.appendChild(manufacturerSpan);
      div.appendChild(modelSpan);
      div.appendChild(typeSpan);
      div.appendChild(storageSpan);
      div.appendChild(speedClassSpan);
      div.appendChild(readSpeedSpan);
      div.appendChild(writeSpeedSpan);
      div.appendChild(editButton);
      div.appendChild(deleteButton);

      productList.appendChild(div);
    });
  }

  // додавання нового товару
  function addProduct() {
    const manufacturer = document.getElementById('виробник').value;
    const model = document.getElementById('модель').value;
    const type = document.getElementById('тип').value;
    const storage = document.getElementById('обсяг').value;
    const speedClass = document.getElementById('speedClass').value;
    const readSpeed = document.getElementById('швидкістьЧитання').value;
    const writeSpeed = document.getElementById('швидкістьЗапису').value;

    const product = {
      виробник: manufacturer,
      модель: model,
      тип: type,
      обсяг: storage,
      speedClass: speedClass,
      швидкістьЧитання: readSpeed,
      швидкістьЗапису: writeSpeed
    };

    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));

    addProductForm.reset();
    updateProductList();
  }

  // редагування товару
  function editProduct(index) {
    const product = products[index];

    const newManufacturer = prompt('Введіть нового виробника:', product.виробник);
    const newModel = prompt('Введіть нову модель:', product.модель);
    const newType = prompt('Введіть новий тип:', product.тип);
    const newStorage = prompt('Введіть новий обсяг пам\'яті (ГБ):', product.обсяг);
    const newSpeedClass = prompt('Введіть новий Speed Class:', product.speedClass);
    const newReadSpeed = prompt('Введіть нову максимальну швидкість читання (МБ/с):', product.швидкістьЧитання);
    const newWriteSpeed = prompt('Введіть нову максимальну швидкість запису (МБ/с):', product.швидкістьЗапису);

    product.виробник = newManufacturer;
    product.модель = newModel;
    product.тип = newType;
    product.обсяг = newStorage;
    product.speedClass = newSpeedClass;
    product.швидкістьЧитання = newReadSpeed;
    product.швидкістьЗапису = newWriteSpeed;

    localStorage.setItem('products', JSON.stringify(products));
    updateProductList();
  }

  // видалення товару
  function deleteProduct(index) {
    if (confirm('Ви впевнені, що хочете видалити цей товар?')) {
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      updateProductList();
    }
  }

  // додавання товару
  addProductForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addProduct();
  });

  // пошук товару
  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {
      const manufacturer = product.виробник.toLowerCase();
      const model = product.модель.toLowerCase();

      return manufacturer.includes(searchTerm) || model.includes(searchTerm);
    });

    productList.innerHTML = '';

    filteredProducts.forEach(function(product, index) {
      const div = document.createElement('div');
      div.classList.add('product');

      const manufacturerSpan = document.createElement('span');
      manufacturerSpan.textContent = 'Виробник: ' + product.виробник;

      const modelSpan = document.createElement('span');
      modelSpan.textContent = 'Модель: ' + product.модель;

      const typeSpan = document.createElement('span');
      typeSpan.textContent = 'Тип: ' + product.тип;

      const storageSpan = document.createElement('span');
      storageSpan.textContent = 'Об\'єм пам\'яті: ' + product.обсяг + ' ГБ';

      const speedClassSpan = document.createElement('span');
      speedClassSpan.textContent = 'Speed Class: ' + product.speedClass;

      const readSpeedSpan = document.createElement('span');
      readSpeedSpan.textContent = 'Максимальна швидкість читання: ' + product.швидкістьЧитання + ' МБ/с';

      const writeSpeedSpan = document.createElement('span');
      writeSpeedSpan.textContent = 'Максимальна швидкість запису: ' + product.швидкістьЗапису + ' МБ/с';

      const editButton = document.createElement('button');
      editButton.textContent = 'Редагувати';
      editButton.addEventListener('click', function() {
        editProduct(index);
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Видалити';
      deleteButton.addEventListener('click', function() {
        deleteProduct(index);
      });

      div.appendChild(manufacturerSpan);
      div.appendChild(modelSpan);
      div.appendChild(typeSpan);
      div.appendChild(storageSpan);
      div.appendChild(speedClassSpan);
      div.appendChild(readSpeedSpan);
      div.appendChild(writeSpeedSpan);
      div.appendChild(editButton);
      div.appendChild(deleteButton);

      productList.appendChild(div);
    });
  });

  // сортування товарів
  sortSelect.addEventListener('change', function() {
    const sortBy = sortSelect.value;

    products.sort(function(a, b) {
      return a[sortBy].localeCompare(b[sortBy]);
    });

    updateProductList();
  });

  // очищення списку товарів
  clearButton.addEventListener('click', function() {
    if (confirm('Ви впевнені, що хочете очистити список товарів?')) {
      products = [];
      localStorage.removeItem('products');
      productList.innerHTML = '';
    }
  });

  updateProductList();
});
