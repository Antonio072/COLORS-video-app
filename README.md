# COLORS-video-app

Este proyecto es una aplicación web desarrollada con Vite y React que te permite visualizar videos del canal COLORS en YouTube, clasificados según el color predominante de su miniatura. [Aquí](https://www.youtube.com/channel/UC2Qw1dzXDBAZPwS7zm37g8g) puedes encontrar el enlace al canal COLORS en YouTube.

## Características

- Clasificación de videos según el color predominante de su miniatura.
- Interfaz de usuario intuitiva y fácil de usar.
- Reproducción de videos directamente en la aplicación.
- Actualización en tiempo real de los videos del canal COLORS en YouTube.

## Capturas de pantalla

![Captura de pantalla 1](screenshot1.png)
![Captura de pantalla 2](screenshot2.png)

## Instalación

1. Clona el repositorio en tu máquina local utilizando el siguiente comando:

```bash
git clone https://github.com/Antonio072/COLORS-video-app.git
```

2. Ve al directorio del proyecto:

```bash

cd COLORS-video-app
```

3. Instala las dependencias utilizando npm o yarn:

```bash
npm install
```
o

```bash
yarn install
```

4. Inicia la aplicación en modo de desarrollo:

```bash
npm run dev
```
o

```bash
yarn dev
```
5. Abre tu navegador y visita http://localhost:5173 para ver la aplicación en acción.

## Uso

1. En la página principal de la aplicación, podrás ver una lista de los videos del canal COLORS en YouTube, clasificados según el color predominante de su miniatura.
2. Haz clic en los botones de colores en la parte superior de la página para filtrar los videos por color.
3. Haz clic en cualquier miniatura de video para reproducirlo directamente en la aplicación.
4. Puedes pausar, reanudar o detener la reproducción del video utilizando los controles de video integrados en la aplicación.

## Contribución

Si deseas contribuir a este proyecto, puedes seguir los siguientes pasos:

1. Haz un fork de este repositorio.
2. Crea una rama con un nombre descriptivo para tu contribución.
3. Realiza los cambios necesarios y haz commit de tus cambios.
4. Envía un pull request a la rama principal de este repositorio.
5. Espera a que tus cambios sean revisados y aprobados antes de hacer merge en la rama principal.

## Tecnologías utilizadas

- [Vite](https://vitejs.dev/): un constructo de compilación y desarrollo web rápido y liviano.
- [React](https://reactjs.org/): una biblioteca de JavaScript para construir interfaces de usuario.
- [YouTube API](https://developers.google.com/youtube): la API oficial de YouTube para interactuar con los datos de YouTube, como videos, canales y comentarios.

## Créditos

Este proyecto fue creado por [José Antonio Velázquez Mandujano](https://github.com/antonio072).

## Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE). Siéntete libre de utilizar, modificar y distribuir este proyecto de acuerdo a los términos de dicha licencia.

## TODOs

### v1
- [x] Reproducción automática al seleccionar video
- [x] Títulos y duración de videos
- [x] Cambio de contraste de texto según color de fondo
- [ ] Cambiar el fondo por una animación de gradiente
- [ ] Crear lista de reproducción personalizada
- [ ] Guardar filtros en cache
- [ ] Usar API como backend
- [ ] Mejorar diseño de la aplicación

### v2
- [ ] Estado inicial para seleccionar color
- [ ] Poder cambiar offset de busqueda de color
- [ ] Cambiar diseño del input para selccionar el color