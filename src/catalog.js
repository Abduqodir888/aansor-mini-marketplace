const API_URL = 'https://fakestoreapi.com/products';
const productGrid = document.getElementById('product-grid');
const productStatus = document.getElementById('product-status');

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function setStatus(message) {
  if (productStatus) {
    productStatus.textContent = message;
  }
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'product-image';
  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.title;
  image.loading = 'lazy';
  imageWrapper.appendChild(image);

  const title = document.createElement('p');
  title.className = 'product-title';
  title.textContent = product.title;

  const meta = document.createElement('div');
  meta.className = 'product-meta';
  const price = document.createElement('span');
  price.className = 'price';
  price.textContent = currency.format(product.price);
  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Add to cart';
  addButton.addEventListener('click', () => {
    const detail = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    };
    window.dispatchEvent(new CustomEvent('cart:add', { detail }));
    addButton.textContent = 'Added!';
    addButton.disabled = true;
    setTimeout(() => {
      addButton.textContent = 'Add to cart';
      addButton.disabled = false;
    }, 900);
  });

  meta.append(price, addButton);
  card.append(imageWrapper, title, meta);
  return card;
}

async function loadProducts() {
  if (!productGrid) return;
  setStatus('Loading products…');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to load products');
    }
    const products = await response.json();
    productGrid.innerHTML = '';
    products.forEach((product) => {
      productGrid.appendChild(createProductCard(product));
    });
    setStatus(products.length ? '' : 'No products found.');
  } catch (error) {
    console.error(error);
    setStatus('Could not load products right now. Please retry.');
  }
}

loadProducts();
