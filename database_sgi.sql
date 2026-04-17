/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: database_sgi
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SGI_categorias`
--

DROP TABLE IF EXISTS `SGI_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SGI_categorias` (
  `id` uuid NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `usuario_id` uuid NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SGI_categorias_usuario_id_b01dc57e_fk_SGI_usuarios_id` (`usuario_id`),
  CONSTRAINT `SGI_categorias_usuario_id_b01dc57e_fk_SGI_usuarios_id` FOREIGN KEY (`usuario_id`) REFERENCES `SGI_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SGI_categorias`
--

LOCK TABLES `SGI_categorias` WRITE;
/*!40000 ALTER TABLE `SGI_categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `SGI_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SGI_lote`
--

DROP TABLE IF EXISTS `SGI_lote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SGI_lote` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_vencimiento` date DEFAULT NULL,
  `fecha_ingreso` date NOT NULL,
  `cantidad_ingresada` int(11) NOT NULL,
  `cantidad_actual` int(11) NOT NULL,
  `producto_id` uuid NOT NULL,
  `precio_lote` decimal(12,2) NOT NULL,
  `usuario_id` uuid NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SGI_lote_producto_id_d708c3f6_fk_SGI_producto_id` (`producto_id`),
  KEY `SGI_lote_usuario_id_a1ac2346_fk_SGI_usuarios_id` (`usuario_id`),
  CONSTRAINT `SGI_lote_producto_id_d708c3f6_fk_SGI_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `SGI_producto` (`id`),
  CONSTRAINT `SGI_lote_usuario_id_a1ac2346_fk_SGI_usuarios_id` FOREIGN KEY (`usuario_id`) REFERENCES `SGI_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SGI_lote`
--

LOCK TABLES `SGI_lote` WRITE;
/*!40000 ALTER TABLE `SGI_lote` DISABLE KEYS */;
/*!40000 ALTER TABLE `SGI_lote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SGI_producto`
--

DROP TABLE IF EXISTS `SGI_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SGI_producto` (
  `date_update` date NOT NULL,
  `id` uuid NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` longtext DEFAULT NULL,
  `precio_venta` decimal(12,2) NOT NULL,
  `stock_minimo` int(11) NOT NULL,
  `maneja_lote` tinyint(1) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `date_add` date NOT NULL,
  `categoria_id` uuid DEFAULT NULL,
  `proveedor_id` uuid DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `usuario_id` uuid NOT NULL,
  `stock_actual` int(11) NOT NULL,
  `precio_compra` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SGI_producto_proveedor_id_bd774cef_fk_SGI_proveedores_id` (`proveedor_id`),
  KEY `SGI_producto_categoria_id_b1751a08_fk_SGI_categorias_id` (`categoria_id`),
  KEY `SGI_producto_usuario_id_e1f9ccf5_fk_SGI_usuarios_id` (`usuario_id`),
  CONSTRAINT `SGI_producto_categoria_id_b1751a08_fk_SGI_categorias_id` FOREIGN KEY (`categoria_id`) REFERENCES `SGI_categorias` (`id`),
  CONSTRAINT `SGI_producto_proveedor_id_bd774cef_fk_SGI_proveedores_id` FOREIGN KEY (`proveedor_id`) REFERENCES `SGI_proveedores` (`id`),
  CONSTRAINT `SGI_producto_usuario_id_e1f9ccf5_fk_SGI_usuarios_id` FOREIGN KEY (`usuario_id`) REFERENCES `SGI_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SGI_producto`
--

LOCK TABLES `SGI_producto` WRITE;
/*!40000 ALTER TABLE `SGI_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `SGI_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SGI_proveedores`
--

DROP TABLE IF EXISTS `SGI_proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SGI_proveedores` (
  `id` uuid NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `acerca` longtext DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(128) NOT NULL,
  `email` varchar(254) DEFAULT NULL,
  `usuario_id` uuid NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SGI_proveedores_usuario_id_3bf97526_fk_SGI_usuarios_id` (`usuario_id`),
  CONSTRAINT `SGI_proveedores_usuario_id_3bf97526_fk_SGI_usuarios_id` FOREIGN KEY (`usuario_id`) REFERENCES `SGI_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SGI_proveedores`
--

LOCK TABLES `SGI_proveedores` WRITE;
/*!40000 ALTER TABLE `SGI_proveedores` DISABLE KEYS */;
/*!40000 ALTER TABLE `SGI_proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SGI_usuarios`
--

DROP TABLE IF EXISTS `SGI_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SGI_usuarios` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `id` uuid NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_registro` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SGI_usuarios`
--

LOCK TABLES `SGI_usuarios` WRITE;
/*!40000 ALTER TABLE `SGI_usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `SGI_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SGI_usuarios_groups`
--

DROP TABLE IF EXISTS `SGI_usuarios_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SGI_usuarios_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usuarios_id` uuid NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SGI_usuarios_groups_usuarios_id_group_id_75b02b4f_uniq` (`usuarios_id`,`group_id`),
  KEY `SGI_usuarios_groups_group_id_e4878a85_fk_auth_group_id` (`group_id`),
  CONSTRAINT `SGI_usuarios_groups_group_id_e4878a85_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `SGI_usuarios_groups_usuarios_id_c2d3ce5b_fk_SGI_usuarios_id` FOREIGN KEY (`usuarios_id`) REFERENCES `SGI_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SGI_usuarios_groups`
--

LOCK TABLES `SGI_usuarios_groups` WRITE;
/*!40000 ALTER TABLE `SGI_usuarios_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `SGI_usuarios_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SGI_usuarios_user_permissions`
--

DROP TABLE IF EXISTS `SGI_usuarios_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SGI_usuarios_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usuarios_id` uuid NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SGI_usuarios_user_permis_usuarios_id_permission_i_ce4892b2_uniq` (`usuarios_id`,`permission_id`),
  KEY `SGI_usuarios_user_pe_permission_id_22a60789_fk_auth_perm` (`permission_id`),
  CONSTRAINT `SGI_usuarios_user_pe_permission_id_22a60789_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `SGI_usuarios_user_pe_usuarios_id_7cdd2a93_fk_SGI_usuar` FOREIGN KEY (`usuarios_id`) REFERENCES `SGI_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SGI_usuarios_user_permissions`
--

LOCK TABLES `SGI_usuarios_user_permissions` WRITE;
/*!40000 ALTER TABLE `SGI_usuarios_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `SGI_usuarios_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES
(1,'Can add permission',1,'add_permission'),
(2,'Can change permission',1,'change_permission'),
(3,'Can delete permission',1,'delete_permission'),
(4,'Can view permission',1,'view_permission'),
(5,'Can add group',2,'add_group'),
(6,'Can change group',2,'change_group'),
(7,'Can delete group',2,'delete_group'),
(8,'Can view group',2,'view_group'),
(9,'Can add content type',3,'add_contenttype'),
(10,'Can change content type',3,'change_contenttype'),
(11,'Can delete content type',3,'delete_contenttype'),
(12,'Can view content type',3,'view_contenttype'),
(13,'Can add session',4,'add_session'),
(14,'Can change session',4,'change_session'),
(15,'Can delete session',4,'delete_session'),
(16,'Can view session',4,'view_session'),
(17,'Can add user',5,'add_usuarios'),
(18,'Can change user',5,'change_usuarios'),
(19,'Can delete user',5,'delete_usuarios'),
(20,'Can view user',5,'view_usuarios'),
(21,'Can add categorias',6,'add_categorias'),
(22,'Can change categorias',6,'change_categorias'),
(23,'Can delete categorias',6,'delete_categorias'),
(24,'Can view categorias',6,'view_categorias'),
(25,'Can add lote',7,'add_lote'),
(26,'Can change lote',7,'change_lote'),
(27,'Can delete lote',7,'delete_lote'),
(28,'Can view lote',7,'view_lote'),
(29,'Can add producto',8,'add_producto'),
(30,'Can change producto',8,'change_producto'),
(31,'Can delete producto',8,'delete_producto'),
(32,'Can view producto',8,'view_producto'),
(33,'Can add proveedores',9,'add_proveedores'),
(34,'Can change proveedores',9,'change_proveedores'),
(35,'Can delete proveedores',9,'delete_proveedores'),
(36,'Can view proveedores',9,'view_proveedores');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES
(2,'auth','group'),
(1,'auth','permission'),
(3,'contenttypes','contenttype'),
(4,'sessions','session'),
(6,'SGI','categorias'),
(7,'SGI','lote'),
(8,'SGI','producto'),
(9,'SGI','proveedores'),
(5,'SGI','usuarios');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES
(1,'contenttypes','0001_initial','2026-03-19 14:04:15.343234'),
(2,'contenttypes','0002_remove_content_type_name','2026-03-19 14:04:15.416590'),
(3,'auth','0001_initial','2026-03-19 14:04:15.604371'),
(4,'auth','0002_alter_permission_name_max_length','2026-03-19 14:04:15.640076'),
(5,'auth','0003_alter_user_email_max_length','2026-03-19 14:04:15.657341'),
(6,'auth','0004_alter_user_username_opts','2026-03-19 14:04:15.674183'),
(7,'auth','0005_alter_user_last_login_null','2026-03-19 14:04:15.687390'),
(8,'auth','0006_require_contenttypes_0002','2026-03-19 14:04:15.690460'),
(9,'auth','0007_alter_validators_add_error_messages','2026-03-19 14:04:15.704874'),
(10,'auth','0008_alter_user_username_max_length','2026-03-19 14:04:15.723066'),
(11,'auth','0009_alter_user_last_name_max_length','2026-03-19 14:04:15.737374'),
(12,'auth','0010_alter_group_name_max_length','2026-03-19 14:04:15.762184'),
(13,'auth','0011_update_proxy_permissions','2026-03-19 14:04:15.777020'),
(14,'auth','0012_alter_user_first_name_max_length','2026-03-19 14:04:15.791553'),
(15,'SGI','0001_initial','2026-03-19 14:04:16.028173'),
(16,'SGI','0002_categorias_lote_producto_proveedores_delete_nadahpta_and_more','2026-03-19 14:04:16.195930'),
(17,'SGI','0003_remove_producto_precio_compra_and_more','2026-03-19 14:04:16.353359'),
(18,'SGI','0004_rename_catagoria_producto_categoria','2026-03-19 14:04:16.444234'),
(19,'SGI','0005_categorias_usuario_producto_usuario_and_more','2026-03-19 14:04:16.618858'),
(20,'SGI','0006_alter_categorias_usuario_alter_producto_usuario_and_more','2026-03-19 14:04:16.848777'),
(21,'SGI','0007_remove_lote_numero_lote_lote_precio_lote','2026-03-19 14:04:16.933921'),
(22,'SGI','0008_producto_stock_actual','2026-03-19 14:04:16.990816'),
(23,'SGI','0009_rename_direccin_proveedores_direccion','2026-03-19 14:04:17.025218'),
(24,'SGI','0010_notificacion','2026-03-19 14:04:17.086794'),
(25,'SGI','0011_delete_notificacion','2026-03-19 14:04:17.096227'),
(26,'SGI','0012_producto_precio_compra','2026-03-19 14:04:17.152689'),
(27,'SGI','0013_lote_usuario','2026-03-19 14:04:17.225713'),
(28,'sessions','0001_initial','2026-03-19 14:04:17.263237');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-19  9:26:13
