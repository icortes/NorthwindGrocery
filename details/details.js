'use strict';

onload = async () => {
  let response = await fetch(`http://localhost:8081/api/products/${productId}`);
  console.log(response);

  if (!response.ok) {
    window.location.replace('/');
  }
  let product = await response.json();
  console.log(product);

  document.getElementById('product').innerHTML = `<div class="col-12">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">Supplier: ${
                    product.supplier
                  }</h6>
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
};
