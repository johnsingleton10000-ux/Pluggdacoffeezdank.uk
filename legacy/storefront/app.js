const WA_NUMBER = '447763383729';
const state = {
  category: 'All',
  cart: JSON.parse(localStorage.getItem('dcbdCart') || '[]'),
  posts: JSON.parse(localStorage.getItem('dcbdPosts') || '[]')
};
const commonCards = ['Top Floor','Wheelie Life','Ride Or Die','My Time','Built Different','Supply Mode','Keys To The City','Count Up','They Watch','Leave A Mark'];
const $ = (id) => document.getElementById(id);

function save(){ localStorage.setItem('dcbdCart', JSON.stringify(state.cart)); localStorage.setItem('dcbdPosts', JSON.stringify(state.posts)); }
function money(n){ return Number(n || 0).toFixed(2); }

function renderFilters(){
  const cats = ['All', ...new Set(window.DCBD_PRODUCTS.map(p => p.category))];
  $('filters').innerHTML = cats.map(cat => `<button class="filter-btn ${state.category===cat?'active':''}" data-cat="${cat}">${cat}</button>`).join('');
  document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => { state.category = btn.dataset.cat; renderProducts(); renderFilters(); }));
}

function renderProducts(){
  const products = state.category === 'All' ? window.DCBD_PRODUCTS : window.DCBD_PRODUCTS.filter(p => p.category === state.category);
  $('productGrid').innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-art" style="--art:${p.color}"><b>${p.name}</b></div>
      <div class="product-body">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.profile}</p>
        <div class="product-meta"><span class="price">£${money(p.price)}</span><span class="tag">+ Card Draw</span></div>
        ${p.stripe ? `<a class="btn btn-primary" target="_blank" rel="noopener" href="${p.stripe}">Stripe Checkout</a>` : `<button class="btn btn-primary" data-add="${p.id}">Add to My Stash</button>`}
      </div>
    </article>`).join('');
  document.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.add)));
}

function addToCart(id){
  const product = window.DCBD_PRODUCTS.find(p => p.id === id);
  const existing = state.cart.find(x => x.id === id);
  if(existing) existing.qty += 1; else state.cart.push({...product, qty:1});
  save(); renderCart(); location.hash = '#stash';
}

function renderCart(){
  const count = state.cart.reduce((a,b)=>a+b.qty,0);
  $('cartCount').textContent = count;
  if(!state.cart.length){ $('cartItems').innerHTML = '<p class="lead">Your stash is empty. Add products from The Vault.</p>'; $('cartTotal').textContent = '0.00'; return; }
  $('cartItems').innerHTML = state.cart.map(item => `<div class="cart-row"><strong>${item.name} × ${item.qty}</strong><span>£${money(item.price * item.qty)}</span><button class="remove" data-remove="${item.id}">Remove</button></div>`).join('');
  $('cartTotal').textContent = money(state.cart.reduce((a,b)=>a+(b.price*b.qty),0));
  document.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => { state.cart = state.cart.filter(x => x.id !== btn.dataset.remove); save(); renderCart(); }));
}

function checkoutWhatsApp(){
  if(!state.cart.length) return alert('Add products to My Stash first.');
  const total = money(state.cart.reduce((a,b)=>a+(b.price*b.qty),0));
  const lines = state.cart.map(item => `- ${item.name} x${item.qty} = £${money(item.price * item.qty)}`).join('\n');
  const qualifies = Number(total) >= 40 ? 'Yes - £40+ card exchange eligible' : 'No - below £40 card exchange threshold';
  const message = `Hi DCBD, I want to order from The Vault.\n\n${lines}\n\nTotal: £${total}\nCard exchange eligible: ${qualifies}\n\nPlease confirm stock and payment instructions.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}

function renderCards(){
  $('commonCards').innerHTML = commonCards.map((name,i)=>`<div class="mini-card"><b>${i===0?'A':i+1}</b><span>${name}</span><small>Common Set 01</small></div>`).join('');
}
function drawCard(){
  const roll = Math.random();
  let rarity = roll < .70 ? 'Common' : roll < .90 ? 'Uncommon' : roll < .98 ? 'Rare' : roll < .995 ? 'Epic' : 'Wonder';
  const card = rarity === 'Common' ? commonCards[Math.floor(Math.random()*commonCards.length)] : `${rarity} DCBD Pull`;
  $('cardReveal').innerHTML = `You revealed: <span>${rarity}</span> — ${card}`;
}

function renderPosts(){
  const defaults = [
    {name:'SmokeKing23', text:'What flavour should return next month?', time:'2h ago'},
    {name:'PandaProfessor', text:'Show off your rookie card collection here.', time:'1d ago'},
    {name:'EstateBorn', text:'Member voting board opens after the first product drop.', time:'2d ago'}
  ];
  const posts = [...state.posts, ...defaults];
  $('boardPosts').innerHTML = posts.map(p => `<div class="board-post"><strong>${p.name}</strong><p>${p.text}</p><small>${p.time}</small></div>`).join('');
}
function addPost(){
  const name = $('postName').value.trim() || 'Guest';
  const text = $('postText').value.trim();
  if(!text) return;
  state.posts.unshift({name,text,time:'Just now'});
  $('postText').value = '';
  save(); renderPosts();
}

$('enterSite').addEventListener('click', () => { $('ageGate').classList.add('hide'); localStorage.setItem('dcbdAgeOk','yes'); });
if(localStorage.getItem('dcbdAgeOk') === 'yes') $('ageGate').classList.add('hide');
$('cartButton').addEventListener('click', () => location.hash = '#stash');
$('whatsappCheckout').addEventListener('click', checkoutWhatsApp);
$('clearCart').addEventListener('click', () => { state.cart = []; save(); renderCart(); });
$('drawCard').addEventListener('click', drawCard);
$('addPost').addEventListener('click', addPost);

renderFilters(); renderProducts(); renderCart(); renderCards(); renderPosts();
