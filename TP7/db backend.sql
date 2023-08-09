-- Crear tabla PERSONA
CREATE TABLE persona (
  dni INT PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL,
  apellido VARCHAR(30) NOT NULL
);

-- Crear tabla USUARIO
CREATE TABLE usuario (
  mail VARCHAR(40) PRIMARY KEY,
  nickname VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL
);

