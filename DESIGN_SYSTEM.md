# Design System — Un Regalito Para Maqui

## Paleta de colores

| Token                | Hex         | Uso                                      |
|---------------------|-------------|-------------------------------------------|
| `--color-white`     | `#FFFFFF`   | Fondo principal del body                  |
| `--color-rosa`      | `#D94F8A`   | Acento principal, CTAs, tipografia script |
| `--color-rosa-light`| `#F0A4C4`   | Nebulosas, degradés                       |
| `--color-azul`      | `#6B8CCE`   | Nebulosas, degradés                       |
| `--color-azul-light`| `#A8C4F0`   | Nebulosas                                 |
| `--color-negro`     | `#1A1A1A`   | Texto principal, headings serif           |
| `--color-gris`      | `#8A7E72`   | Texto secundario, labels, metadata        |
| `--color-border`    | `#F0ECE6`   | Bordes de cards, inputs, divisores        |

### Gradientes

| Token              | Valor                                              | Uso               |
|-------------------|-----------------------------------------------------|--------------------|
| `--gradient-bar`  | `linear-gradient(90deg, #6B8CCE, #D94F8A, #F0A4C4)`| Barra de progreso  |
| `--gradient-glass`| `linear-gradient(135deg, #D94F8A, #9B6CB8, #6B8CCE)`| Borde glass        |

## Tipografia — 3 niveles

| Nivel    | Fuente           | Var CSS            | Uso                                            |
|----------|-----------------|---------------------|-------------------------------------------------|
| Serif    | Playfair Display | `--font-playfair`  | Titulos estructurales, headings, precios        |
| Script   | Dancing Script   | `--font-dancing`   | Palabras emocionales, siempre en rosa           |
| Sans     | DM Sans          | `--font-dm-sans`   | Cuerpo, labels, formularios, metadata           |

### Escala tipografica

| Token                | Tamaño | Uso                              |
|---------------------|--------|-----------------------------------|
| `--size-hero-script`| 56px   | Hero: texto cursivo emocional     |
| `--size-hero-serif` | 62px   | Hero: nombre/titulo principal     |
| `--size-h2`         | 24px   | Titulos de seccion                |
| `--size-body`       | 15px   | Texto de cuerpo                   |
| `--size-label`      | 13px   | Labels uppercase con tracking     |
| `--size-metadata`   | 11px   | Info secundaria minima            |

### Tracking

| Token                | Valor | Uso                    |
|---------------------|-------|-------------------------|
| `--tracking-label`  | 3px   | Labels uppercase        |
| `--tracking-metadata`| 2px  | Metadata uppercase      |

### Ejemplo de jerarquia en el Hero

```
"entre todos le hacemos"  → Label (sans, uppercase, gris, 13px, tracking 3px)
"un regalito"             → Script (Dancing Script, rosa #D94F8A, 56px)
"para Lu"                 → Serif (Playfair Display, negro #1A1A1A, 62px)
```

## Radios

| Token              | Valor | Uso                              |
|-------------------|-------|-----------------------------------|
| `--radius-glass`  | 24px  | Contenedores glass (hero, featured)|
| `--radius-card-lg`| 18px  | Cards grandes                     |
| `--radius-card`   | 14px  | Cards regulares                   |
| `--radius-input`  | 12px  | Inputs y textareas                |
| `--radius-pill`   | 50px  | Botones pill                      |

## Efectos especiales

### Nebulosas

Manchas de gradiente difuso decorativas en el fondo.

- Implementacion: divs con `filter: blur(60px)` posicionados absolute
- Colores: rosa y azul
- Opacidad: ~0.12
- Componente: `<Nebulosa color="rosa" position="top-right" size="lg" />`

### Glass container

Contenedor con efecto vidrio + borde degradé:

- Fondo: `rgba(255, 255, 255, 0.45)`
- Blur: `backdrop-filter: blur(16px)`
- Borde: gradiente rosa → violeta → azul via `mask-composite: exclude`
- Clase: `.glass-border` en CSS
- Componente: `<Card variant="glass" />`

## Componentes UI primitivos

Todos en `src/components/ui/`. Se importan desde `@/components/ui`.

| Componente     | Props principales                          | Uso                           |
|---------------|---------------------------------------------|-------------------------------|
| `Button`      | `variant: "filled" \| "outline"`, `fullWidth` | CTAs y acciones              |
| `Card`        | `variant: "default" \| "glass"`, `padding`  | Contenedores de contenido     |
| `Input`       | `label`, `hint`, `prefix`                   | Campos de formulario          |
| `Textarea`    | `label`, `hint`                             | Areas de texto                |
| `SectionTitle`| `children`                                  | H2 de cada seccion            |
| `Label`       | `children`                                  | Labels uppercase tracking     |
| `Divider`     | —                                           | Separador entre secciones     |
| `Badge`       | `children`                                  | Indicador circular (✓, etc.)  |
| `Nebulosa`    | `color`, `position`, `size`                 | Decoracion de fondo           |
| `Section`     | `maxWidth: "content" \| "form"`             | Wrapper de seccion con padding|

### Ejemplo de uso

```tsx
import { Button, Card, Input, SectionTitle, Section, Label, Divider } from "@/components/ui";

<Section>
  <SectionTitle>Mi seccion</SectionTitle>
  <Card variant="glass" padding="lg">
    <Label>Subtitulo</Label>
    <Input label="Email" placeholder="tu@email.com" />
    <Button variant="filled" fullWidth>Enviar</Button>
  </Card>
</Section>
```

## Animaciones

Todas CSS nativas, sin librerias. Definidas en `globals.css`.

| Clase                 | Keyframe       | Duracion | Uso                         |
|----------------------|----------------|----------|-----------------------------|
| `.animate-fade-in`   | `fadeIn`       | 0.8s     | Aparicion suave             |
| `.animate-fade-in-up`| `fadeInUp`     | 0.6s     | Entrada desde abajo         |
| `.animate-scale-in`  | `scaleIn`      | 0.5s     | Entrada con escala          |
| `.animate-slide-in`  | `slideInRight` | 0.5s     | Entrada desde la izquierda  |
| `.animate-fill-bar`  | `fillBar`      | 1.5s     | Llenado de barra progreso   |
| `.animate-pulse-soft`| `pulse`        | 2s loop  | Pulsacion sutil continua    |

### Stagger (entrada escalonada)

```html
<div class="animate-fade-in-up stagger-1">Primero</div>
<div class="animate-fade-in-up stagger-2">Segundo</div>
<div class="animate-fade-in-up stagger-3">Tercero</div>
```

Delays: `.stagger-1` (0.1s) a `.stagger-5` (0.5s).

## Utilidades

| Funcion       | Ubicacion        | Uso                                          |
|--------------|------------------|-----------------------------------------------|
| `formatPrice`| `src/lib/utils.ts`| Formato de moneda ARS: `formatPrice(165990)` → `$ 165.990` |

## Archivos clave

| Archivo                  | Contenido                                  |
|-------------------------|---------------------------------------------|
| `src/app/globals.css`   | Tokens CSS, glass, animaciones              |
| `src/lib/tokens.ts`     | Tokens como constantes TypeScript           |
| `src/lib/utils.ts`      | Utilidades compartidas (formatPrice)        |
| `src/components/ui/`    | Componentes primitivos reutilizables        |
| `src/app/layout.tsx`    | Carga de fuentes (Playfair, Dancing, DM Sans)|
