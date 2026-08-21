# Un regalito para Maqui

Pagina para juntar plata entre amigos/familia y regalar. Misma estructura y design
system que `unregalitoparalu`, con los datos vacios para personalizar.

Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 + Supabase.

## Arrancar

```bash
npm install
```

```bash
npm run dev
```

Abrir http://localhost:3000

## Que personalizar

| Que | Donde |
|-----|-------|
| Nombre, emoji, fecha, alias de pago, tabla de Supabase | `src/data/config.ts` |
| Lista de regalos (nombre, precio, imagen, link, emoji) | `src/data/gifts.ts` |
| Fotos de los regalos | `public/gifts/` (cuadradas) |
| Favicon | `src/app/icon.svg` |
| Colores y tipografias | `src/app/globals.css` + `src/lib/tokens.ts` (ver `DESIGN_SYSTEM.md`) |

Los regalos se desbloquean en orden: cada uno se marca como cumplido cuando la
recaudacion total supera la suma acumulada de los precios anteriores.

## Base de datos

1. En el proyecto de Supabase, correr `supabase-schema.sql` (crea la tabla
   `contributions_maqui`, separada de la de Lu).
2. Copiar `.env.example` a `.env.local` y completar las credenciales.

Los montos individuales se guardan pero **no** se muestran en el front: solo se
publica el total y los mensajes.

## Modo reveal

`NEXT_PUBLIC_PAGE_MODE` en `.env.local`:

- `normal` — pagina para juntar (hero, wishlist, formulario).
- `reveal` — pagina final: agradecimiento, total y foto en `public/gifts/reveal.jpg`.
