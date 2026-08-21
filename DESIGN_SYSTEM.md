# Design System — Un Regalito Para Maqui

Estetica inspirada en **The Sims**: plumbob verde, paneles de vidrio celeste,
botones de plastico brillante y barras de necesidades.

## Paleta de colores

### Plumbob (verde) — acento principal y estados "desbloqueado"

| Token                   | Hex       | Uso                                     |
|-------------------------|-----------|------------------------------------------|
| `--color-plumbob`       | `#2FD44A` | Verde base del diamante, hitos logrados  |
| `--color-plumbob-light` | `#9BF7A4` | Punta clara de degradés                  |
| `--color-plumbob-deep`  | `#12A33A` | Texto verde, montos recaudados           |

### Cyan de UI — paneles, CTAs y bordes

| Token                | Hex       | Uso                                   |
|----------------------|-----------|----------------------------------------|
| `--color-cyan`       | `#16B6E8` | Acento de interfaz, focus de inputs    |
| `--color-cyan-light` | `#8FE3FB` | Degradés y brillos                     |
| `--color-cyan-deep`  | `#0B7FB4` | Labels, texto de acento, sombras       |

### Azules de fondo y texto

| Token               | Hex       | Uso                                  |
|---------------------|-----------|---------------------------------------|
| `--color-navy`      | `#0A2A40` | Texto principal, headings             |
| `--color-slate`     | `#5E8299` | Texto secundario, metadata            |
| `--color-sky`       | `#E4F4FD` | Fondo medio                           |
| `--color-sky-deep`  | `#C7E9F8` | Fondo bajo, relleno vacio de barras   |
| `--color-border`    | `#BFE4F5` | Bordes de inputs                      |

### Gradientes

| Token                    | Uso                                        |
|--------------------------|---------------------------------------------|
| `--gradient-bar`         | Relleno de la barra de necesidades (verde)  |
| `--gradient-panel`       | Borde degradé de paneles glass              |
| `--gradient-cta`         | Botones cyan (accion principal)             |
| `--gradient-cta-green`   | Botones verdes (confirmar, logrado)         |
| `--gradient-sky`         | Fondo del body                              |

## Tipografia — 3 niveles

| Nivel    | Fuente   | Var CSS          | Uso                                   |
|----------|----------|------------------|----------------------------------------|
| Logo     | SimLLHP  | `--font-sims`    | Titulo del hero y titulos de seccion   |
| Display  | Fredoka  | `--font-fredoka` | Botones, labels, precios, nombres, UI  |
| Sans     | Nunito   | `--font-nunito`  | Cuerpo, parrafos, mensajes             |

### De donde sale la fuente del logo

Las fuentes reales de The Sims 2 no son libres ni estan en Google Fonts:

| Uso                | Fuente real            |
|--------------------|------------------------|
| Logo / wordmark    | Lettering a mano sobre base tipo **Frutiger Black** |
| Titulos in-game    | **Benguiat Gothic Bold** |
| Texto in-game      | **Helvetica Neue**     |

El wordmark de la caja no es una fuente instalable: esta dibujado a mano, con
letras de tamaños y ejes desparejos.

El proyecto usa **SimLLHP** (`src/fonts/SimsLLHP.ttf`), una recreacion fan del
wordmark, **gratis para uso personal y no comercial**. Se sirve self-hosteada
con `next/font/local`, no desde un CDN.

#### ⚠️ No dibuja acentos

**Los titulos no pueden llevar acentos, `ñ`, `¿` ni `¡`.**

```
á é í ó ú  Á É Í Ó Ú  ñ Ñ  ü Ü  ¿ ¡
```

Estos caracteres **si** figuran en la tabla cmap del .ttf, pero apuntan a
glifos de **0 bytes**: estan vacios. Por eso no cae al fallback — la fuente
declara que los tiene y dibuja nada, dejando un hueco. "¿Cómo participo?"
se veia como "C mo participo".

Verificar un font nuevo mirando solo la cmap **no alcanza**: hay que chequear
que `loca[gid+1] - loca[gid] > 0`.

Los titulos afectados se reformularon en vez de escribirlos mal:

| Antes                            | Ahora                          |
|----------------------------------|--------------------------------|
| `¿Cómo participo?`               | `Como participo?`              |
| `Mensajitos de cumpleaños`       | `Mensajitos para {PERSON_NAME}`|
| `La cumpleañera con sus regalos` | `La festejada con sus regalos` |

`SectionTitle` avisa por consola en desarrollo si le pasas un texto con esos
caracteres (`warnIfUnsupportedInSimsFont` en `src/lib/utils.ts`).

**El cuerpo del texto no tiene este problema**: usa Nunito y lleva acentos
normalmente.

Tiene **un solo peso** y ya es pesada, por eso `.sims-title` fuerza
`font-weight: normal` y `font-synthesis-weight: none`: si se le pide bold, el
navegador la engorda sintéticamente y con el contorno grueso queda un borron.

### Tratamiento del wordmark (`.sims-title`)

- Relleno blanco
- Contorno azul `--color-outline` (`#14479A`) de `0.085em`
- Sombra dura abajo + sombra difusa para despegar del fondo
- `paint-order: stroke fill` para que el contorno vaya **detras** del relleno y
  la letra no se adelgace. Sin soporte degrada a contorno centrado.

Los tamaños se dan en `em` para que el contorno escale con la tipografia.
`.sims-title-sm` es la version de contorno fino, para titulos de seccion.

```tsx
<h1>
  <span className="sims-title sims-title-sm text-[26px]">Un regalito para</span>
  <span className="sims-title text-[104px]">Maqui</span>
</h1>
```

### Escala tipografica

| Token                | Tamaño | Uso                              |
|----------------------|--------|-----------------------------------|
| `--size-hero-script` | 52px   | Hero: primera linea               |
| `--size-hero-serif`  | 64px   | Hero: titulo principal            |
| `--size-h2`          | 28px   | Titulos de seccion                |
| `--size-body`        | 15px   | Texto de cuerpo                   |
| `--size-label`       | 12px   | Labels uppercase con tracking     |
| `--size-metadata`    | 11px   | Info secundaria minima            |

### Jerarquia en el Hero

Replica el armado del logo: la palabra chica arriba y el nombre grande abajo,
igual que "The" sobre "SiMs".

```
Plumbob girando              → Plumbob size=72, animation="spin"
"Un regalito para"           → .sims-title .sims-title-sm, 36px
"Maqui"                      → .sims-title, 104px
"🎁 SE VIENE EL CUMPLE"      → Label (Fredoka, uppercase, cyan-deep)
"Maqui pide, nosotros..."    → Fredoka semibold, cyan-deep, 24px
```

## Radios

El UI del juego es muy redondeado, asi que todos los radios subieron.

| Token              | Valor | Uso                              |
|--------------------|-------|-----------------------------------|
| `--radius-glass`   | 28px  | Paneles glass (hero, pago)        |
| `--radius-card-lg` | 24px  | Cards grandes, globos de dialogo  |
| `--radius-card`    | 20px  | Cards regulares                   |
| `--radius-input`   | 16px  | Inputs y textareas                |
| `--radius-pill`    | 50px  | Botones pill                      |

## Efectos especiales

### Plumbob

El diamante verde que flota sobre los Sims. Es el elemento firma del sistema:
aparece como spinner de carga, badge de regalo desbloqueado, viñeta de titulos,
separador y favicon.

```tsx
<Plumbob size={40} animation="spin" />   // gira sobre su eje (rotateY)
<Plumbob size={26} dimmed />              // gris, para hitos bloqueados
```

Se dibuja como un octaedro: 4 poligonos con distinto tono para simular volumen
mas un destello blanco. Ver `src/components/ui/Plumbob.tsx`.

### Panel (`.sims-panel`)

Contenedor tipo HUD del juego:

- Fondo: `rgba(255, 255, 255, 0.72)` + `backdrop-filter: blur(14px)`
- Borde: 2px blanco solido
- Sombra: cyan difusa hacia abajo
- Brillo: `::after` con degradé blanco en el 45% superior

**Importante:** el brillo es un pseudo-elemento sobre el contenido, por eso
`Card` envuelve sus hijos en un `<div className="relative z-10">`. Si usas
`.sims-panel` a mano, acordate de hacer lo mismo.

### Panel con borde degradé (`.panel-border`)

Igual que el anterior pero con borde de 2.5px en degradé cyan → verde → celeste,
via `mask-composite: exclude`. Es la variante `<Card variant="glass" />`.

### Boton glossy (`.sims-button`)

Plastico brillante: degradé vertical, highlight superior via `::before`,
sombra solida abajo que simula grosor, y hundimiento al hacer `:active`.

### Barra de necesidades (`.need-bar` + `.need-bar-fill`)

La barra de progreso imita las barras de necesidades del juego: relleno verde
con degradé, sombra interna, y muescas verticales cada 7.14% dibujadas con
`repeating-linear-gradient` sobre el relleno.

### Grilla isometrica (`.iso-grid`)

Patron de fondo con dos degradés cruzados a ±30°, evoca el piso del modo
construccion. Se aplica al hero.

### La habitacion (`src/components/room/`)

Escena fija arriba de la barra de progreso: el avatar parado en un cuarto, y
los regalos apareciendo a medida que se desbloquean.

| Archivo            | Contiene                                            |
|--------------------|------------------------------------------------------|
| `SimsRoom.tsx`     | El cuarto isometrico y el armado de la escena        |
| `Avatar.tsx`       | El sprite del personaje                             |
| `art.tsx`          | Los sprites de cada regalo                          |
| `PixelSprite.tsx`  | Motor que convierte un mapa de caracteres en rects  |

#### Isometrico

El cuarto es un rombo con dos paredes que suben desde los bordes de atras,
con la camara en diagonal desde arriba como en el juego. viewBox `0 0 320 240`:

| Esquina  | Coordenada  |
|----------|-------------|
| Fondo    | `160,60`    |
| Izquierda| `20,130`    |
| Derecha  | `300,130`   |
| Frente   | `160,200`   |

Alto de pared: `60`. Alto del revestimiento de madera: `40`.

Todo se dibuja con `shapeRendering="crispEdges"`: sin antialias las diagonales
quedan escalonadas, que es lo que da el aspecto de la epoca.

#### Pixel art

Los sprites se declaran como **mapas de caracteres**, no como paths. Cada
caracter es un pixel y `.` es transparente:

```tsx
const perfume: PixelPiece = {
  cols: 7,
  palette: { G: "#D9A441", P: "#F0A8C6", p: "#DE7FA8" },
  map: ["..GGG..", ".PPPPP.", "PppppPP"],
};
```

`PixelSprite` los renderiza juntando pixeles iguales y contiguos de cada fila
en un solo `<rect>`, asi un sprite de 16x32 no termina siendo 512 nodos.

**El avatar es una grilla de 16x32.** Los `wearables` usan ESA MISMA grilla, asi
que las filas coinciden una a una y se superponen sin calcular nada:

| Fila | Parte     |
|------|-----------|
| 0    | Alto de la cabeza |
| 7-8  | Ojos      |
| 14   | Cuello    |
| 15   | Hombros   |
| 24   | Cadera    |
| 30   | Zapatillas|

**Para sumar un regalo nuevo:**

1. Agregar el id en `AvatarArt` (`src/types/index.ts`)
2. Dibujarlo en `art.tsx`, en `wearables` (grilla 16x32, se superpone al
   avatar) o `props` (sprite suelto que se apoya en la comoda)
3. Referenciarlo desde `src/data/gifts.ts` con `avatar: { kind, art }`

Las filas de un mapa tienen que medir todas lo mismo; si no, el dibujo se
desplaza.

Un regalo **sin** campo `avatar` funciona igual: aparece en la wishlist y suma
al total, solo que no cambia nada en la escena.

La animacion de aparicion es `.room-item` (keyframe `itemPop`): cae desde
arriba con rebote. Usa `transform-box: fill-box` para que el escalado salga del
centro de la pieza y no del origen del viewBox.

### Modo demo

Con Supabase caido o vacio el total es `$0` y no se ve ningun regalo. En
desarrollo, `/?demo=130000` fuerza un total para probar la escena.

### Nebulosas

Manchas difusas de fondo (`blur(70px)`, opacidad 0.22). Ahora en verde plumbob
y cyan: `<Nebulosa color="plumbob" position="top-right" size="lg" />`.

## Componentes UI primitivos

Todos en `src/components/ui/`. Se importan desde `@/components/ui`.

| Componente     | Props principales                                    | Uso                          |
|----------------|------------------------------------------------------|------------------------------|
| `Plumbob`      | `size`, `animation`, `dimmed`                        | El diamante verde            |
| `Button`       | `variant: "filled" \| "green" \| "outline"`, `fullWidth` | CTAs y acciones          |
| `Card`         | `variant: "default" \| "glass"`, `padding`           | Contenedores                 |
| `Input`        | `label`, `hint`, `prefix`                            | Campos de formulario         |
| `Textarea`     | `label`, `hint`                                      | Areas de texto               |
| `SectionTitle` | `children`, `withPlumbob`                            | H2 con plumbob flotando      |
| `Label`        | `children`                                           | Labels uppercase tracking    |
| `Divider`      | —                                                    | Separador con plumbob central|
| `Badge`        | `children` (opcional)                                | Indicador; sin hijos = plumbob|
| `Nebulosa`     | `color: "plumbob" \| "cyan"`, `position`, `size`     | Decoracion de fondo          |
| `Section`      | `maxWidth: "content" \| "form"`                      | Wrapper con padding          |
| `Wave`         | `flip`, `color`                                      | Separador ondulado           |

### Ejemplo de uso

```tsx
import { Button, Card, Input, SectionTitle, Section, Plumbob } from "@/components/ui";

<Section>
  <SectionTitle>Mi seccion</SectionTitle>
  <Card variant="glass" padding="lg">
    <Plumbob size={34} animation="spin" />
    <Input label="Email" placeholder="tu@email.com" />
    <Button variant="green" fullWidth>Enviar</Button>
  </Card>
</Section>
```

## Animaciones

Todas CSS nativas, sin librerias. Definidas en `globals.css`.

| Clase                    | Keyframe       | Duracion  | Uso                        |
|--------------------------|----------------|-----------|-----------------------------|
| `.animate-fade-in`       | `fadeIn`       | 0.8s      | Aparicion suave             |
| `.animate-fade-in-up`    | `fadeInUp`     | 0.6s      | Entrada desde abajo         |
| `.animate-scale-in`      | `scaleIn`      | 0.5s      | Entrada con escala          |
| `.animate-slide-in`      | `slideInRight` | 0.5s      | Entrada desde la izquierda  |
| `.animate-fill-bar`      | `fillBar`      | 1.5s      | Llenado de la barra         |
| `.animate-pulse-soft`    | `pulse`        | 2s loop   | Pulsacion sutil             |
| `.animate-marquee`       | `marquee`      | 20s loop  | Cinta horizontal            |
| `.animate-plumbob-spin`  | `plumbobSpin`  | 4s loop   | Plumbob girando (rotateY)   |
| `.animate-plumbob-float` | `plumbobFloat` | 3s loop   | Plumbob flotando            |
| `.animate-plumbob-pulse` | `plumbobPulse` | 2.5s loop | Latido del brillo verde     |

Las animaciones en loop se desactivan con `prefers-reduced-motion: reduce`.

### Stagger (entrada escalonada)

```html
<div class="animate-fade-in-up stagger-1">Primero</div>
<div class="animate-fade-in-up stagger-2">Segundo</div>
```

Delays: `.stagger-1` (0.1s) a `.stagger-5` (0.5s).

## Utilidades

| Funcion       | Ubicacion         | Uso                                          |
|---------------|-------------------|-----------------------------------------------|
| `formatPrice` | `src/lib/utils.ts`| Formato ARS: `formatPrice(165990)` → `$ 165.990` |

## Archivos clave

| Archivo                        | Contenido                              |
|--------------------------------|-----------------------------------------|
| `src/app/globals.css`          | Tokens CSS, paneles, botones, animaciones|
| `src/lib/tokens.ts`            | Tokens como constantes TypeScript       |
| `src/components/ui/Plumbob.tsx`| El diamante verde                       |
| `src/components/ui/`           | Componentes primitivos                  |
| `src/app/layout.tsx`           | Carga de fuentes (Fredoka, Nunito)      |
| `src/app/icon.svg`             | Favicon: plumbob                        |
