# VTEX IO Fortune Cookie App

## Descripción
App de galletas chinas de la fortuna para VTEX IO. Permite mostrar frases aleatorias y administrar el contenido desde el Admin.

## Instalación

1. Clonar repo:  
   `git clone https://github.com/your-user/fortune-cookie.git`
2. Instalar dependencias y publicar cada app:
   ```sh
   cd fortune-cookie/store-block && vtex link
   cd ../store-theme && vtex link
   cd ../admin && vtex link
   ```
3. Configurar la landing page en el Theme con el bloque `fortune-cookie`.

## Uso

- Landing: `/fortune-cookie`
- Admin: `/admin/fortune-cookie`
- Agrega/edita frases desde el Admin.

## Notas

- Todo el acceso a Master Data es vía GraphQL.
- Para producción, solicitar acceso y configurar permisos en VTEX.

## Estructura
- store-block: Módulo front
- admin: Módulo admin
- store-theme: Landing y estilos
