# Guía Rápida de Edición — Jeanfranco Velasquez Portfolio

## Estructura de Archivos

```
index.html / index.css / index.js     → Lobby principal
design.html / design.css / design.js  → Diseño Gráfico
editor.html / editor.css / editor.js  → Video & Web
lang.js                               → Sistema de idiomas ES/EN
```

---

## 1. Agregar Videos de YouTube

Abre `editor.html` y busca los bloques de tarjetas con `data-ytid`.

**Pasos:**
1. Ve a tu video en YouTube
2. Copia el ID de la URL: `youtube.com/watch?v=`**`ESTE_ID`**
3. Reemplaza el placeholder en el HTML:

```html
<!-- ANTES -->
<div class="yt-card reel" data-ytid="REEL_ID_1" data-title="Reel 01">

<!-- DESPUÉS -->
<div class="yt-card reel" data-ytid="dQw4w9WgXcQ" data-title="Mi Reel de Marca">
```

El thumbnail se carga automáticamente. Al hacer clic se reproduce en la página.

**Cambiar el nombre** que aparece bajo el video:
```html
<span class="yt-name">Mi Reel de Marca</span>
```

---

## 2. Agregar Imágenes de Diseño (Google Drive)

En `design.html`, cada proyecto tiene un bloque `.img-skeleton`.

**Pasos:**
1. Sube tu imagen a Google Drive
2. Clic derecho → "Compartir" → "Cualquiera con el enlace puede ver"
3. Copia el ID de la URL: `drive.google.com/file/d/`**`ESTE_ID`**`/view`
4. Reemplaza el bloque entero:

```html
<!-- ANTES (skeleton placeholder) -->
<div class="img-skeleton">
  ...todo el contenido del skeleton...
  <div class="sk-hint">Reemplazar con tu imagen</div>
</div>

<!-- DESPUÉS (imagen real) -->
<img src="https://drive.google.com/uc?export=view&id=TU_FILE_ID"
     alt="Identidad de Marca — Proyecto 01"
     loading="lazy">
```

> **Nota:** Si Drive bloquea la imagen, sube la imagen directamente al repositorio en una carpeta `/assets/images/` y usa: `src="assets/images/mi-imagen.jpg"`

---

## 3. Agregar Imágenes a la Galería (design.html)

Misma mecánica. Busca `.gal-img-placeholder` y reemplaza:

```html
<!-- ANTES -->
<div class="gal-img-placeholder" style="background:...">
  <span>Branding — tu imagen aquí</span>
</div>

<!-- DESPUÉS -->
<img src="https://drive.google.com/uc?export=view&id=TU_FILE_ID"
     alt="Colección de Branding" loading="lazy">
```

---

## 4. Agregar/Editar Proyectos Web (editor.html)

Busca `.web-card` en `editor.html`. Para editar:

```html
<div class="wc-cat">Tu Categoría — 2025</div>
<h3 class="wc-title">Nombre del Proyecto</h3>
<p class="wc-desc">Descripción del proyecto...</p>
<div class="wc-stack">
  <span>HTML5</span><span>CSS3</span><span>React</span>
</div>
<div class="wc-btns">
  <a href="https://tu-sitio.com" class="wc-btn wc-btn-primary">Ver Sitio</a>
  <a href="https://github.com/..." class="wc-btn">Ver en GitHub</a>
</div>
```

Para agregar una captura de pantalla real:
```html
<!-- Reemplaza .wc-img-placeholder completo por: -->
<img src="assets/images/proyecto-screenshot.jpg" alt="Nombre Proyecto" loading="lazy">
```

---

## 5. Agregar/Editar Imágenes de Redes Sociales (editor.html)

Busca `.sg-item` dentro de `#social`. Reemplaza `.sg-placeholder`:

```html
<!-- ANTES -->
<div class="sg-placeholder" style="background:..."><span>Instagram Posts</span></div>

<!-- DESPUÉS -->
<img src="https://drive.google.com/uc?export=view&id=TU_FILE_ID"
     alt="Posts de Instagram" loading="lazy">
```

---

## 6. Cambiar Idioma por Defecto

Abre `lang.js` y busca esta línea al inicio del módulo `Lang`:

```js
let current = localStorage.getItem(STORAGE_KEY) || 'es';
```

Cambia `'es'` por `'en'` para que el inglés sea el idioma por defecto.

---

## 7. Deploy a GitHub Pages

```bash
# 1. En tu repositorio de GitHub, sube todos los archivos a la raíz
git add .
git commit -m "Portfolio v2 launch"
git push origin main

# 2. Ve a Settings → Pages
# 3. Source: "Deploy from a branch"
# 4. Branch: main / root → Save
```

Tu sitio estará en: `https://jeanfrancovl.github.io/`

---

## Contacto y Colores de Marca

Para cambiar el color dorado o la información de contacto, edita las variables en `:root` al inicio de cada archivo `.css`:

```css
:root {
  --gold: #C4A265;   /* color dorado principal */
  --cream: #ECE5D8;  /* texto claro / headings */
  --bg-0: #080710;   /* fondo más oscuro */
}
```

Para el email y teléfono, busca `jeanvelaslarez@gmail.com` y `+57 310 478 8919` en todos los HTML.

