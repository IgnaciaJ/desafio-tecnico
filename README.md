# Desafío técnico - Joustra

Para este proyecto se utilizó en el backend Django y en Frontend React.

###Consideraciones generales

1. Se utiliza pipenv en la altura del directorio raíz de la app (el repositorio), esto para generar un entorno virtual y que no se deban instalar librerías de los frameworks escogidos. Por lo que para la realización de este proyecto se requiere instalar pipenv y ejecutar en el directorio el comando ```pipenv shell```

2. Para ejecutar la app se deben ejecutar los siguientes comandos:

2.1 Se deben crear las migraciones de la base de datos, por lo que se debe correr: ``` python3 manage.py makemigrations restaurants```,  ``` python3 manage.py migrate restaurants```

2.2 para el backend se debe ejecutar ``` python3 manage.py runserver``` en la carpeta backend

2.3 Mientras que el frontend se debe ejecutar en la carpeta frontend con el comando ```npm start```

3. La App a nivel frontend no se encuentra modularizada ni tampoco modelada con una gran escalabilidad, esto se debe a que la tabla base que utilice no ocupaba las librerías óptimas para poder garantizar lo anterior.(Se puede re-modelar utilizando react-table)


####Requisitos de la App

###### Backend:

* Filtro: a nivel de backend se aplicó el filtro de búsqueda por **ciudad**, el cual busca de forma parcial el input entregado en la base de datos. (se puede ver en: ```backend/restaurants/views.py line:12```)

* Persistencia de datos: Todas las operaciones CRUD realizadas a nivel frontend, son procesadas previamente por el backend y consultadas a la base de datos SQLite que se conecta  a este

###### Frontend:

* Orden de Columnas: se puede ordenar las columnas ascendente y descendentemente cuando en la tabla, se presiona el header correspondiente a estas(Ej: presiona el header nombre, y se ordena en orden ascendente los restaurantes, si este botón se vuelve a presionar se realiza de forma descendiente), es case insensitive

* Filtro: Se establecen dos filtros, por un lado filtrar por tipo de restaurante, donde se buscan los que al igual que el filtro del backend tiene un match parcial, y uno que realiza tres tablas: los restaurantes visitados, sin visitar y todos los restaurantes(Se pueden ver en:```` frontend/src/App.js line:218-242```)

##### Archivos Importantes

###### Backend

1. Restaurants, es donde se encuentra toda la lógica del CRUD, para facilitar la ejecución e implementación se utilizó la librería ```rest_framework```, en la carpeta restaurants se encuentra todo lo que es necesario para entender como se compone el modelo.

###### Frontend

1. ```src/App.js```, se encuentra toda la lógica que hay en la tabla.

2. ```src/components/Modal.js```, contiene el form utilizado para crear y actualizar un restaurante.

##### Referencias externas
Por lo general varias dudas técnicas las resolví a través de https://stackoverflow.com/ y https://geeksforgeeks.org/, Sin embargo, utilicé referencias expícitas en las siguentes partes:

###### General

1. Para crear el modelo y conectar backend y frontend utilicé el contenido de la siguiente página web: https://www.section.io/engineering-education/react-and-django-rest-framework/, la cual utilicé principalmente en ```restaurants/views.py``` en el backend y en  ```src/App.js``` y ```src/components/Modal.js``` en el frontend, y con esto conectar la API con el servidor y tener una tabla base(sin todos los requisitos) funcionando correctamente.


###### Backend
1. Para realizar el filtro me inspiré en https://www.geeksforgeeks.org/filter-data-in-django-rest-framework/

###### Frontend

1. Para crear una tabla que se pueda ordenar se modificó el código asociado a la siguiente página https://www.smashingmagazine.com/2020/03/sortable-tables-react/ y se aplicó en ```frontend/src/App.js lines: 240-260,320-350```

2. Para hacer el filtro de nivel frontend se utilizó el link https://www.bezkoder.com/react-table-example-hooks-crud/ inspirandose en la función ```findByTitle``` del código de la fuente
