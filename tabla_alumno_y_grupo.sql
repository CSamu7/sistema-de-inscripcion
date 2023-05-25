
CREATE DATABASE sistema_de_inscripcion;

use sistema_de_inscripcion;

CREATE TABLE usuario(
	numero_de_cuenta int not null auto_increment,
	contra varbinary(128) not null,
  nombre varchar(40) not null,
  apellido_paterno varchar(50) not null,
	apellido_materno varchar(50) not null,
	es_admin boolean not null,
  id_grupo int,
  
  PRIMARY KEY (numero_de_cuenta)
);

CREATE TABLE grupo(
	id_grupo int not null,
  cupo tinyint not null,
  cantidad_alumnos int not null,
    
  PRIMARY KEY (id_grupo)
);

INSERT INTO usuario (contra, nombre, apellido_paterno, apellido_materno, es_admin) VALUES (aes_encrypt("hola", "secretkey21") ,"Oscar Samuel", "Pérez", "De Gante", 1);

INSERT INTO grupo (id_grupo, cupo, cantidad_alumnos) VALUES (1, 30, 0);
INSERT INTO grupo (id_grupo, cupo, cantidad_alumnos) VALUES (2, 30, 2);