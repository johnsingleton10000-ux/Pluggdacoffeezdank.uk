# DCBD — Layer 1: Landing / Membership
## pluggedacofferzdank.uk

---

## 📁 File Structure

```
/
├── .cursorrules          ← Cursor rules (DO NOT DELETE)
├── .htaccess             ← Namecheap clean URLs + security
├── index.html            ← Layer 1: Landing page (THIS FILE)
├── data.json             ← All 70 products + 24 boosters + gates
├── css/
│   ├── base.css          ← Shared styles, variables, utilities
│   └── layer1.css        ← Landing page styles only
├── js/
│   ├── core.js           ← SHARED: User, cart, XP, gates, events
│   └── layer1.js         ← Landing page interactions only
└── assets/
    ├── cards/            ← Your 70 chronic card images (DCBD-001.png to DCBD-070.png)
    ├── ui/               ← Backgrounds, icons, textures
    └── branding/         ← Logo, favicon, El Castro avatar (1000000131.png)
```

---

## 🚀 How To Use With Cursor

### Step 1: Drop These Files Into Your Project
Copy everything from this folder into your Cursor workspace root.

### Step 2: Add Your Images
Replace the placeholder paths in `index.html` with your actual generated images:
- `/assets/cards/DCBD-001.png` through `/assets/cards/DCBD-070.png`
- `/assets/branding/1000000131.png` (El Castro avatar)
- `/assets/ui/hero-bg.jpg` (optional hero background)

### Step 3: Tell Cursor The Rules
Cursor will auto-read `.cursorrules`. It knows:
- NEVER modify `core.js` without permission
- NEVER change `data.json` schema
- Gate 0 is BLOCKING (mandatory)
- Use vanilla JS only

### Step 4: Test Layer 1
Open `index.html` in a browser. Test:
1. Click "Get Connected" → modal opens
2. Enter username + tag → connects user
3. Check Gate 0 → acknowledge → gate passes
4. Scroll animations work
5. Nav updates with user tag

### Step 5: Deploy to Namecheap
1. Zip the entire folder
2. Upload to `public_html/` via File Manager or FTP
3. Ensure `.htaccess` is at root
4. Visit `pluggedacofferzdank.uk`

---

## 🔒 Gate 0: Don't Eat
This is already built and BLOCKING. The user must check the box and click acknowledge before Layer 2 is accessible. This is enforced in `core.js` via `DCBD.canAccessLayer(2)`.

---

## 📋 Next Sections (Tell Cursor These One At A Time)

| Section | Files | Cursor Prompt |
|---------|-------|---------------|
| **S2: Layer 2 Shop** | `shop.html`, `css/layer2.css`, `js/layer2.js` | "Build the product grid using data.json. Import core.js. Display all 70 cards with filters for archetype and rarity. Add to cart functionality." |
| **S3: Layer 2 Vault** | `vault.html`, update `layer2.js` | "Add Flip Three game mechanic. Three cards, random draw, XP rewards. Gate 0 must be passed." |
| **S4: Layer 3 Admin** | `admin.html`, `css/layer3.css`, `js/layer3.js` | "Build admin panel for ElCastro. God control. View all users, manage stock, override gates. Legendary tier only." |
| **S5: Forum** | `forum.html`, `js/forum.js` | "Build forum system. Threads, replies, user tags. Initiate tier minimum." |

**CRITICAL:** Only give Cursor ONE section at a time. Close the chat after each section. Start a new chat for the next.

---

## 🎨 Customization

### Change Colors
Edit `css/base.css` `:root` variables. The whole site updates.

### Add More Cards
Edit `data.json` products array. Follow the existing schema exactly.

### Change Fonts
The Google Fonts link is in `index.html` `<head>`. Update the font families in `base.css` `:root`.

---

## ⚠️ Important Notes

- `core.js` is sacred. It handles all shared state. Cursor should never touch it.
- `data.json` schema must stay consistent. All products need: id, name, archetype, rarity, xpValue, price, image, gate, tierRequired, description, stock, boosters, isChronic.
- Berserker archetype rare rate is 4%. This is a known issue — do not let Cursor "fix" it unless you explicitly ask.
- All image paths in HTML/JSON are relative to root (`/assets/...`). Make sure your Namecheap hosting serves from `public_html/`.

---

Built for DCBD · pluggedacofferzdank.uk · El Castro
