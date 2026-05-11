<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DCBD • DaCoffeezDank</title>
  <style>
    :root{
      --black:#050007;--purple:#b700ff;--green:#39ff14;--pink:#ff1dce;--smoke:#d9b5ff;--card:#110015cc;
    }
    *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:var(--black);color:white;font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;overflow-x:hidden;}
    body:before{content:"";position:fixed;inset:0;background:radial-gradient(circle at 20% 20%,#6d00a950,transparent 28%),radial-gradient(circle at 80% 30%,#0dff0030,transparent 24%),linear-gradient(180deg,#050007,#08000c 40%,#030004);z-index:-3}
    body:after{content:"";position:fixed;inset:0;background:repeating-linear-gradient(90deg,transparent 0 26px,#22ff0022 27px 28px);opacity:.25;animation:matrix 11s linear infinite;z-index:-2}
    @keyframes matrix{from{background-position:0 -900px}to{background-position:0 900px}}
    .nav{position:fixed;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:14px 28px;background:linear-gradient(180deg,#050007e8,#05000770,transparent);backdrop-filter:blur(6px)}
    .logo{font-size:34px;color:var(--purple);text-shadow:0 0 18px var(--purple),3px 3px #000;line-height:.8}.logo span{display:block;font-size:20px;color:var(--green);transform:rotate(-4deg)}
    .nav a,.nav button{color:white;background:none;border:0;text-decoration:none;margin:0 10px;font-size:16px;cursor:pointer}.nav a:hover{color:var(--green);text-shadow:0 0 12px var(--green)}
    .join{border:2px solid var(--purple)!important;padding:10px 14px!important;color:var(--green)!important;box-shadow:0 0 16px #b700ff80;border-radius:4px}.cart-pill{border:2px solid var(--green);padding:10px 14px;border-radius:999px;color:white;text-decoration:none;box-shadow:0 0 18px #39ff1477;background:#050007cc}.universe-fill{position:absolute;inset:auto 3vw 20px auto;width:180px;height:180px;border-radius:32px;background:linear-gradient(135deg,#b700ff66,#39ff1433),radial-gradient(circle,#fff2,transparent 60%);border:2px solid #b700ff99;box-shadow:0 0 28px #b700ff77;display:grid;place-items:center;font-size:70px;opacity:.9;animation:dance 3.4s ease-in-out infinite}.universe-fill small{position:absolute;bottom:12px;font-size:16px;color:#39ff14;text-shadow:0 0 12px #39ff14}
    section{min-height:100vh;padding:100px 5vw 60px;position:relative;overflow:hidden}.hero{display:grid;place-items:center;text-align:center;background:radial-gradient(circle at center,#2d003c 0,#08000c 46%,#000 100%)}
    .hero-art{position:absolute;inset:0;background:linear-gradient(#0005,#000c),url('entry-art.jpg') center/cover no-repeat;filter:saturate(1.3) contrast(1.15);animation:slowzoom 18s ease-in-out infinite alternate;opacity:.9}.hero-content{position:relative;z-index:2;max-width:1000px}.title{font-size:clamp(58px,10vw,150px);color:var(--purple);text-shadow:0 0 30px var(--purple),6px 6px #000;letter-spacing:2px;animation:melt 3s ease-in-out infinite alternate}.subtitle{font-size:clamp(28px,5vw,70px);color:var(--green);text-shadow:0 0 25px var(--green);transform:rotate(-2deg)}
    .smoke-title{font-size:clamp(48px,8vw,120px);color:#e6c7ff;text-shadow:0 0 20px #fff,0 0 45px var(--purple),0 0 90px var(--purple);filter:url(#wavy);animation:smokefloat 5s ease-in-out infinite alternate}.enter{margin-top:30px;font-size:30px;padding:18px 42px;border:3px solid var(--purple);background:#0a0012cc;color:var(--green);box-shadow:0 0 20px var(--purple), inset 0 0 18px #39ff1433;cursor:pointer;border-radius:8px}.enter:hover{transform:scale(1.06) rotate(-1deg);box-shadow:0 0 35px var(--green)}
    @keyframes slowzoom{to{transform:scale(1.08)}} @keyframes melt{to{letter-spacing:6px;filter:drop-shadow(0 16px 8px #b700ff60)}} @keyframes smokefloat{to{transform:translateY(-20px) scale(1.03)}}
    .character{position:absolute;width:130px;height:130px;border-radius:50%;background:radial-gradient(circle,#b700ff,#270033 55%,#000);border:2px solid var(--green);box-shadow:0 0 25px var(--purple);display:grid;place-items:center;font-size:60px;animation:dance 2.5s ease-in-out infinite;z-index:4}.character:after{content:"○ ○ ○";position:absolute;top:-34px;color:#e6c7ff;letter-spacing:8px;text-shadow:0 0 18px var(--purple);animation:rings 2s linear infinite}.c1{left:4%;bottom:13%}.c2{right:5%;top:22%;animation-delay:.5s}.c3{right:12%;bottom:8%;animation-delay:1s}@keyframes dance{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-18px) rotate(5deg)}}@keyframes rings{to{transform:translateY(-40px) scale(1.6);opacity:0}}
    .section-title{font-size:clamp(46px,7vw,100px);color:var(--green);text-shadow:0 0 25px var(--green),4px 4px #000;margin:0 0 20px}.purple{color:var(--purple);text-shadow:0 0 25px var(--purple)}
    .story{background:linear-gradient(90deg,#1a0024,#050007 50%,#071000);}.story-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center}.panel{background:var(--card);border:2px solid #b700ff99;box-shadow:0 0 25px #b700ff55;padding:26px;border-radius:18px;font-family:Arial, sans-serif;line-height:1.6}.panel strong{color:var(--green)}
    .menu-drop{margin-top:25px}.drop-btn{width:100%;text-align:left;background:#09000f;border:2px solid var(--purple);color:var(--green);padding:18px;font-size:24px;box-shadow:0 0 16px #b700ff80;cursor:pointer}.drop-content{display:none;background:#060009;border:2px solid #39ff1466;border-top:0;padding:20px;max-height:520px;overflow:auto;font-family:Arial, sans-serif}.drop-content.open{display:block}.safe-note{color:#e6c7ff;font-size:13px;line-height:1.5}.menu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}.menu-card{border:1px solid #b700ff88;background:#14001dcc;padding:14px;border-radius:12px}.menu-card h4{margin:0 0 8px;color:var(--green);font-family:Impact;font-size:23px}.price{color:var(--purple);font-weight:bold}
    .products{background:#050007}.products-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px}.product{background:linear-gradient(145deg,#13001d,#030004);border:2px solid #b700ff88;border-radius:20px;padding:18px;box-shadow:0 0 20px #b700ff44;position:relative;overflow:hidden}.product:before{content:"";position:absolute;inset:-30%;background:radial-gradient(circle,#39ff1430,transparent 55%);animation:spin 9s linear infinite}.product>*{position:relative}.product h3{font-size:28px;color:white}.product button,.checkout button{width:100%;padding:12px;background:#0b0012;color:var(--green);border:2px solid var(--purple);font-size:18px;cursor:pointer}@keyframes spin{to{transform:rotate(360deg)}}
    .membership{background:radial-gradient(circle at 70% 30%,#144000,#050007 45%)}.price-big{font-size:clamp(70px,10vw,140px);color:var(--green);text-shadow:0 0 35px var(--green)}
    .checkout{background:#050007}.cart-box{max-width:820px;margin:auto;background:#100016;border:2px solid var(--purple);border-radius:20px;padding:24px;box-shadow:0 0 30px #b700ff77;font-family:Arial,sans-serif}.cart-row{display:flex;justify-content:space-between;border-bottom:1px solid #ffffff22;padding:10px 0}.cart-total{font-size:26px;color:var(--green);font-weight:bold;text-align:right;margin-top:18px}.field{width:100%;padding:14px;margin:8px 0;background:#050007;border:1px solid #39ff1488;color:white}.footer{text-align:center;padding:30px;color:#aaa;font-family:Arial,sans-serif;border-top:1px solid #b700ff66}.legal{font-size:12px;color:#aaa;max-width:900px;margin:20px auto;line-height:1.6}
    @media(max-width:800px){.nav{position:sticky;flex-wrap:wrap}.story-grid{grid-template-columns:1fr}.character{width:90px;height:90px;font-size:42px}.nav-links{display:none}}.pop-zone{position:fixed;inset:0;pointer-events:none;z-index:30;overflow:hidden}
.pop-mascot{position:absolute;width:92px;height:92px;border-radius:28px;background:radial-gradient(circle at 35% 25%,#39ff14,#b700ff 42%,#08000c 75%);border:2px solid #39ff14;box-shadow:0 0 22px #b700ff,0 0 12px #39ff14;display:grid;place-items:center;font-size:44px;opacity:0;transform:scale(.2) rotate(-20deg);animation:randomPop 4.8s ease-in-out forwards}.pop-mascot:before{content:"";position:absolute;inset:-14px;border-radius:34px;background:radial-gradient(circle,#b700ff55,transparent 65%);filter:blur(8px)}.pop-mascot:after{content:"◯ ◯";position:absolute;top:-28px;left:18px;color:#e6c7ff;text-shadow:0 0 14px #b700ff;animation:miniSmoke 1.8s linear infinite}.pop-mascot span{position:relative;animation:wiggle .55s ease-in-out infinite alternate}@keyframes randomPop{0%{opacity:0;transform:scale(.15) translateY(30px) rotate(-30deg)}12%,78%{opacity:1;transform:scale(1) translateY(0) rotate(6deg)}45%{transform:scale(1.12) translateY(-12px) rotate(-8deg)}100%{opacity:0;transform:scale(.25) translateY(-55px) rotate(28deg)}}@keyframes miniSmoke{to{transform:translateY(-28px) scale(1.5);opacity:0}}@keyframes wiggle{to{transform:translateY(-5px) rotate(8deg)}}

  </style>
</head>
<body>
  <div class="pop-zone" id="popZone"></div>
  <svg width="0" height="0"><filter id="wavy"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="2"><animate attributeName="baseFrequency" dur="7s" values="0.012;0.026;0.012" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="10"/></filter></svg>  <nav class="nav">
    <div class="logo">DCBD<span>DaCoffeezDank</span></div>
    <div class="nav-links"><a href="#story">Story/Menu</a><a href="#products">Products</a><a href="#membership">Membership</a><a href="#checkout">Checkout</a></div>
    <a class="join" href="#membership">JOIN THE REVOLUTION</a>
    <a class="cart-pill" href="#checkout">🛒 <span id="cartCount">0</span></a>
  </nav>  <section class="hero" id="entry">
    <div class="hero-art"></div>
    <div class="character c1">☠️</div><div class="character c2">🎩</div><div class="character c3">👁️</div>
    <div class="hero-content">
      <div class="title">DCBD</div>
      <div class="subtitle">DaCoffeezDank</div>
      <div class="smoke-title">JOIN THE REVOLUTION</div>
      <button class="enter" onclick="location.href='#story'">ENTER THE LOUNGE</button>
    </div>
  </section>  <section class="story" id="story">
    <div class="universe-fill">🎻<small>DCBD UNIVERSE</small></div>
    <h2 class="section-title purple">THE OAKSEY STORY</h2>
    <div class="story-grid">
      <div class="panel">
        <h3>From pain to purpose.</h3>
        <p>This page is the origin room: cerebral palsy, pressure, being written off, and turning survival into art, business, independence and a movement.</p>
        <p><strong>DCBD is not just a shop.</strong> It is a dark comic universe built around resilience, creativity, loyalty and revolutionary energy.</p>
        <p>Smoke spells: <strong>PAIN → PURPOSE → POWER → REVOLUTION</strong>.</p>
      </div>
      <div class="panel">
        <h3>Animated party universe</h3>
        <p>Cartoon rebels pop out, dance, blow smoke rings, melt into Matrix code, then vanish back into purple fog. Use original mascots inspired by your artwork, not copied TV characters.</p>
      </div>
    </div><div class="menu-drop">
  <button class="drop-btn" onclick="toggleMenu()">🧪 Amsterdam Style Botanical Extract Menu ▼</button>
  <div class="drop-content" id="menuContent">
    <p class="safe-note">Menu wording is written as a compliant-style botanical catalogue. Avoid medical, psychoactive, potency, or legal claims unless verified by qualified compliance/legal review and batch documents.</p>
    <div class="menu-grid" id="menuGrid"></div>
  </div>
</div>

  </section>  <section class="products" id="products">
    <div class="universe-fill" style="left:3vw;right:auto;top:120px;bottom:auto">☕<small>COFFEEZ DANK</small></div>
    <h2 class="section-title">OUR PRODUCTS</h2>
    <div class="products-grid" id="productsGrid"></div>
  </section>  <section class="membership" id="membership">
    <h2 class="section-title purple">DCBD MEMBERSHIP</h2>
    <div class="story-grid">
      <div class="panel"><h3>Join the movement</h3><p>Exclusive discounts, early access, members-only drops, loyalty gifts and VIP support.</p><p style="color:#39ff14;font-size:20px;text-shadow:0 0 12px #39ff14">NEW MEMBERS GET 10% OFF THEIR FIRST ORDER + REVOLUTION TAX WAIVED.</p><button onclick="addToCart('DCBD Revolutionary Membership',19.99)">JOIN NOW</button></div>
      <div><div class="price-big">£19.99</div><h2>/month</h2></div>
    </div>
  </section>  <section class="checkout" id="checkout">
    <div class="universe-fill" style="right:4vw;top:110px;bottom:auto">🛒<small>CART ROOM</small></div>
    <h2 class="section-title">CHECKOUT</h2>
    <div class="cart-box">
      <div id="cartItems">Your cart is empty.</div>
      <div class="cart-row" id="revolutionTaxRow"><span>Revolution Tax — waived for members</span><strong>£3.00</strong></div>
      <div class="cart-total" id="cartTotal">Total: £0.00</div>
      <input class="field" id="custName" placeholder="Your name" />
      <input class="field" id="custPostcode" placeholder="Postcode / area" />
      <textarea class="field" id="custNote" placeholder="Order notes"></textarea>
      <div class="panel" style="margin:18px 0;background:#08000c;border-color:#39ff14">
        <h3 style="color:#39ff14;margin-top:0">BANK TRANSFER</h3>
        <p><strong>Account name:</strong> DCBD / Pluggd Coffee & Dank</p>
        <p><strong>Sort code:</strong> 09-01-28</p>
        <p><strong>Account number:</strong> 05730233</p>
        <p><strong>Payment reference:</strong> DCBD + your name</p>
        <p class="safe-note">Please send the order request on WhatsApp after payment so we can match your transfer to your order.</p>
      </div>
      <button onclick="whatsappCheckout()">SEND ORDER + PAYMENT REF ON WHATSAPP</button>
      <p class="safe-note">Checkout sends an order request by WhatsApp. Bank transfer is handled manually by the customer using the details above.</p>
    </div>
  </section>  <div class="footer">
    <div class="logo">DCBD<span>DaCoffeezDank</span></div>
    <p class="legal">Adults 18+ only. Hemp-derived botanical extract / tea extract branding placeholder. Not intended to diagnose, treat, cure or prevent disease. Product compliance, FSA status, lab results, ingredient listings, payment rules and UK legal wording must be checked before public launch.</p>
  </div>  <script>
    const whatsappNumber = '447000000000'; // replace with your WhatsApp number, e.g. 447123456789
    const products = [
      {name:'Amsterdam Gold Botanical Press', price:10.80, desc:'Golden pressed botanical extract style. 10% launch reduction applied.'},
      {name:'Black Magic Botanical Press', price:9.90, desc:'Dark classic botanical profile. 10% launch reduction applied.'},
      {name:'Afghan Pie Signature Extract', price:12.60, desc:'Signature premium botanical extract. 10% launch reduction applied.'},
      {name:'Lebanese Blonde Botanical Press', price:9.00, desc:'Light smooth botanical profile. 10% launch reduction applied.'},
      {name:'Moroccan Kif Inspired Blend', price:8.10, desc:'Traditional-style botanical blend. 10% launch reduction applied.'},
      {name:'Dutch Master Solventless Style', price:18.00, desc:'Premium pressed botanical extract style. 10% launch reduction applied.'}
    ];
    const menuItems = [
      ['Amsterdam Gold Botanical Press','1g £10.80 • 3g £28.80 • 5g £45 • 10g £85.50'],
      ['Black Magic Botanical Press','1g £9.90 • 3g £27 • 5g £42.30 • 10g £81'],
      ['Afghan Pie Signature Extract','1g £12.60 • 3g £34.20 • 5g £54 • 10g £99'],
      ['Lebanese Blonde Botanical Press','1g £9 • 3g £24.30 • 5g £37.80 • 10g £72'],
      ['Moroccan Kif Inspired Blend','1g £8.10 • 3g £21.60 • 5g £34.20 • 10g £64.80'],
      ['Premium Crystal Botanical Extract','1g £24.30–£28.80 • 3.5g £78.30–£90'],
      ['Fresh Profile Resin Style','1g £19.80–£22.50 • 3.5g £63–£70.20'],
      ['Solventless Rosin Style','1g £15.30–£18 • 3g £42.30–£49.50']
    ];
    const cart = [];
    function renderProducts(){
      document.getElementById('productsGrid').innerHTML = products.map(p=>`<div class="product"><h3>${p.name}</h3><p>${p.desc}</p><h2 class="price">£${p.price.toFixed(2)}</h2><button onclick="addToCart('${p.name}',${p.price})">ADD TO CART</button></div>`).join('');
      document.getElementById('menuGrid').innerHTML = menuItems.map(([n,p])=>`<div class="menu-card"><h4>${n}</h4><p>${p}</p><button onclick="addToCart('${n}',0)">ASK ON WHATSAPP</button></div>`).join('');
    }
    function addToCart(name,price){cart.push({name,price});renderCart();location.href='#checkout'}
    function renderCart(){
      const isMember=cart.some(i=>i.name.toLowerCase().includes('membership'));
      const tax=cart.length && !isMember ? 3 : 0;
      const discount=isMember ? 0.10 : 0;
      document.getElementById('cartCount').innerText=cart.length;
      document.getElementById('revolutionTaxRow').style.display=cart.length ? 'flex' : 'none';
      document.getElementById('revolutionTaxRow').innerHTML=isMember?'<span>Revolution Tax</span><strong>WAIVED — MEMBER</strong>':'<span>Revolution Tax — waived when you join</span><strong>£3.00</strong>';
      if(!cart.length){document.getElementById('cartItems').innerHTML='Your cart is empty.';document.getElementById('cartTotal').innerText='Total: £0.00';return}
      document.getElementById('cartItems').innerHTML=cart.map((i,idx)=>`<div class="cart-row"><span>${i.name}</span><strong>${i.price?`£${i.price.toFixed(2)}`:'Quote'}</strong></div>`).join('');
      const subtotal=cart.reduce((s,i)=>s+i.price,0);
      const discountAmount=subtotal*discount;
      const total=subtotal-discountAmount+tax;
      const discountLine=isMember?`<div class="cart-row"><span>Revolution Member Discount</span><strong>-£${discountAmount.toFixed(2)}</strong></div>`:'';
      document.getElementById('cartItems').innerHTML+=discountLine;
      document.getElementById('cartTotal').innerText=`Total: £${total.toFixed(2)}`;
    }
    function whatsappCheckout(){
      const name=document.getElementById('custName').value||'Customer';
      const pc=document.getElementById('custPostcode').value||'Not provided';
      const note=document.getElementById('custNote').value||'No notes';
      const lines=cart.length?cart.map(i=>`- ${i.name} ${i.price?`£${i.price.toFixed(2)}`:'quote requested'}`).join('%0A'):'No cart items selected';
      const isMember=cart.some(i=>i.name.toLowerCase().includes('membership'));
      const tax=cart.length && !isMember ? 3 : 0;
      const subtotal=cart.reduce((s,i)=>s+i.price,0);
      const discount=isMember ? subtotal*0.10 : 0;
      const total=(subtotal-discount+tax).toFixed(2);
      const msg=`DCBD order request%0AName: ${encodeURIComponent(name)}%0AArea: ${encodeURIComponent(pc)}%0A%0AItems:%0A${lines}%0A${tax? '%0ARevolution Tax: £3.00' : '%0ARevolution Tax: WAIVED FOR MEMBERS'}${isMember ? '%0AMember Discount: 10% OFF APPLIED' : ''}%0A%0ATotal: £${total}%0ANotes: ${encodeURIComponent(note)}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`,'_blank');
    }
    function toggleMenu(){document.getElementById('menuContent').classList.toggle('open')}
    function spawnMascot(){
      const zone=document.getElementById('popZone');
      const icons=['☠️','👁️','🎩','🧪','🎻','😈','🟣','🟢'];
      const m=document.createElement('div');
      m.className='pop-mascot';
      m.style.left=Math.random()*86+'vw';
      m.style.top=(12+Math.random()*72)+'vh';
      m.style.animationDuration=(3.2+Math.random()*2.8)+'s';
      m.innerHTML='<span>'+icons[Math.floor(Math.random()*icons.length)]+'</span>';
      zone.appendChild(m);
      setTimeout(()=>m.remove(),6200);
    }
    setInterval(spawnMascot,1400);
    setTimeout(()=>{spawnMascot();spawnMascot();},700);
    renderProducts();renderCart();
  </script></body>
</html>