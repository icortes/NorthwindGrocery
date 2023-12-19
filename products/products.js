'use strict';

function displayProducts(products) {
  let productsEl = document.getElementById('products');
  productsEl.innerHTML = '';
  products.forEach((product) => {
    productsEl.innerHTML += `<div class="col-12 col-sm-6 col-md-6 col-lg-4">
          <div class="card mb-3 h-100">
            <div class="row g-0">
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">Supplier: ${
                    product.supplier
                  }</h6>
                  <a href="/details/?productId=${product.productId}" class="text-decoration-none stretched-link">See details</a>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <p class="card-text text-end">stock: ${product.unitsInStock}</p>
                  <p class="card-text text-end">price: $${Number(
                    product.unitPrice
                  ).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  });
}

function displayCategoryDropdown(categories) {
  let categoriesEl = document.getElementById('categories');
  categoriesEl.innerHTML = "";
  categoriesEl.classList.remove('d-none');
  categoriesEl.appendChild(new Option('Select one...', '-1', true));
  categories.forEach((category) =>
    categoriesEl.appendChild(new Option(category.name, category.categoryId))
  );

  categoriesEl.addEventListener('change', async () => {
    let selectedCategory = categoriesEl.value;
    let res = await fetch(
      'http://localhost:8081/api/products/bycategory/' + selectedCategory
    );
    let products = await res.json();
    displayProducts(products);
  });
}

onload = async () => {
  let searchDropdown = document.getElementById('searchDropdown');

  let res = await fetch('http://localhost:8081/api/products');
  let products = await res.json();
  displayProducts(products);

  searchDropdown.addEventListener('change', async () => {
    document.getElementById('products').innerHTML = '';
    document.getElementById('categories').classList.add('d-none');
    let selected = searchDropdown.value;

    switch (selected) {
      case 'all':
        document.getElementById('main').style.height = "100%";
        res = await fetch('http://localhost:8081/api/products');
        let products = await res.json();
        displayProducts(products);
        break;
      case 'category':
        document.getElementById('main').style.height = "100vh";
        res = await fetch('http://localhost:8081/api/categories');
        let categories = await res.json();
        displayCategoryDropdown(categories);
        break;
      default:
        break;
    }
  });
};
