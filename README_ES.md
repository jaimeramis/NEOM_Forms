# NEOM FORMS

Web Development - Front End - NEOM Forms

# Funcionalidad:

Encargo para el cliente de Arabia Saudí NEOM. Se trata de tres páginas para formularios: encontramos página de agradecimiento, de disculpas y los formularios. Todo preparado para su desarrollo Backend ejecutado por otro equipo de trabajo.

# Características:

- Página de agradecimiento.
- Página de contacto.
- Formularios.

# Requisitos:

- Stack tecnológico: HTML, CSS con SASS, JS, PNPM / NPM y Typescript para realizar el deployment de entrega.
- Frameworks: Hugo que define la estructura del proyecto.

# Estructura del Proyecto:

- **assets**: Carpeta que incluye los archivos SASS.
- **content**: Carpeta en la que están las diferentes páginas desarrolladas.
- **layouts**: Carpeta que tiene Hugo para gestionar los archivos comunes como el footer.
- **public**: Carpeta en la que aparece la estrucutra temporal antes del hacer el build del proyecto.
- **resources**: Carpeta propia del framework de Hugo.
- **static**: Carpeta en la que aparecen los archivos JS y las imagenes estáticas. Puede incluir videos.

# Instalación:

1. Descarga o clona el repositorio.
2. Asegurarte de que no te falta nada instalado en tu sistema como por ejemplo pnpm aunque es opcional. Puedes usar npm si quieres.
3. Para ejecutar el proyecto:

```bash
# Comando para ejecutar la visualización de la carpeta content. Una vez ejecutado ir al localhost y escribir el nombre de uno de los archivos.
#Ejemplo: http://localhost:1313/en/preferences-contact/

hugo server
```

4. Para hacer el build de entrega usar el comando creado:

```bash
# Con este comando se ejecuta la limpieza de la carpeta public y aparece la carpeta deploy. En ella aparece el HTML con su CSS y JS compilado para cada una de las instancias.
pnpm run build

#Alternativa si no quieres usar pnpm:
npm run build
```

Gracias por su atención.<br>
JR
