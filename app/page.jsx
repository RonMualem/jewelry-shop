'use client'

import { useMemo, useState } from 'react'

const SHOP_NAME = 'MyJewelry'                      // שם החנות שלך
const WHATSAPP_PHONE = '972544383037'             // <--- עדכן למספר שלך בפורמט בינלאומי בלי 0 בתחלה (ישראל: 9725XXXXXXX)

const PRODUCTS = [
  {
    id: 'bracelet-gold-01',
    name: 'צמיד זהב עדין',
    price: 199,
    category: 'צמידים',
    lengths: ['16cm', '18cm', '20cm'],
    badge: 'בסט סלר',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'necklace-silver-02',
    name: 'שרשרת כסף עם תליון',
    price: 249,
    category: 'שרשראות',
    lengths: ['40cm', '45cm', '50cm'],
    badge: 'חדש',
    image: 'https://images.unsplash.com/photo-1520974735194-7b1c1c2e0f00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ring-gold-03',
    name: 'טבעת זהב קלאסית',
    price: 299,
    category: 'טבעות',
    lengths: ['52', '54', '56', '58'],
    badge: '',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bracelet-silver-04',
    name: 'צמיד כסף משולב',
    price: 179,
    category: 'צמידים',
    lengths: ['16cm', '18cm', '20cm'],
    badge: '',
    image: 'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'necklace-pearl-05',
    name: 'שרשרת פנינים אלגנטית',
    price: 329,
    category: 'שרשראות',
    lengths: ['40cm', '45cm'],
    badge: 'קלאסי',
    image: 'https://images.unsplash.com/photo-1515569067071-ec3b51339f23?auto=format&fit=crop&w=800&q=80'
  },
  {
  id: "three-friends-01",
  name: "שלושה חמודים",
  price: 500,
  category: "מיוחדים",
  lengths: ["סטנדרטי"],
  badge: "חדש",
  image: "https://drive.google.com/thumbnail?id=1iAO7FO216ZeU7zso9ssXjSZTxCfiF_9z&sz=w1200"
  },
  {
    id: "ronit-sea-01",
    name: "ילד עם רונית ים",
    price: 700,
    category: "מיוחדים",
    lengths: ["סטנדרטי"],
    badge: "חדש",
    image: "https://drive.google.com/thumbnail?id=15V_LVStCa2oEZNWrQ4XM52H6gZPoXjPg&sz=w1200"
  }
]

const categories = ['', ...Array.from(new Set(PRODUCTS.map(p => p.category)))]

function waLink(product, length) {
  const text = `היי! אני מעוניין ב${product.name} (דגם ${product.id})
אורך/מידה: ${length}
מחיר: ${product.price}₪`
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('')
  const [likes, setLikes] = useState({})

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const okCat = cat ? p.category === cat : true
      const okText = (p.name + ' ' + p.category).toLowerCase().includes(query.toLowerCase())
      return okCat && okText
    })
  }, [query, cat])

  const toggleLike = (id) => setLikes(s => ({...s, [id]: !s[id]}))
  const clearFilters = () => { setQuery(''); setCat('') }

  return (
    <div className="wrap">
      <div className="hdr">
        <div className="brand">
          <div className="logo" aria-hidden="true"></div>
          <h1>✨ החנות של {SHOP_NAME}</h1>
        </div>
        <a className="cta" href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noopener">צ׳אט מהיר ב־WhatsApp</a>
      </div>

      <p className="note">בחרו מוצר, אורך/מידה, ולחצו “הזמנה ב־WhatsApp”. אין צורך בהרשמה או סליקה באתר.</p>

      <div className="filters reveal">
        <div className="field">
          <input placeholder="חיפוש מוצר..." value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
        <div className="field">
          <select value={cat} onChange={e=>setCat(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c || 'כל הקטגוריות'}</option>)}
          </select>
        </div>
        <button className="btn-clear" onClick={clearFilters}>נקה סינון</button>
      </div>

      <section className="grid">
        {filtered.map((p, i) => (
          <article key={p.id} className="card reveal">
            <button className="heart" onClick={()=>toggleLike(p.id)} aria-label="שמור למועדפים">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={likes[p.id] ? '#f43f5e' : 'none'} stroke={likes[p.id] ? '#f43f5e' : '#e5e7eb'} strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s-6.716-4.297-9.192-6.773C.333 11.752.333 8.248 2.808 5.773 5.284 3.297 8.788 3.297 11.263 5.773L12 6.51l.737-.737c2.475-2.476 5.98-2.476 8.455 0 2.475 2.475 2.475 5.979 0 8.454C18.716 16.703 12 21 12 21Z"/>
              </svg>
            </button>
            {p.badge ? <div className="badge">{p.badge}</div> : null}
            <div className="img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} />
            </div>
            <div className="body">
              <h3 className="name">{p.name}</h3>
              <div className="price">{p.price} ₪</div>
              <div className="opt-label">בחר/י אורך/מידה:</div>
              <div className="btns">
                {p.lengths.map(len => (
                  <a key={len} className="btn" href={waLink(p, len)} target="_blank" rel="noopener">
                    {len} — הזמנה
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer>© {new Date().getFullYear()} {SHOP_NAME} · תשלום ע״י ביט/העברה/כפי שתעדיפו בצ׳אט</footer>
    </div>
  )
}
