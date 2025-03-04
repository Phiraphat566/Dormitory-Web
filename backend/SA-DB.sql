-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dormitory
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `complaint_asking_for_pets`
--

DROP TABLE IF EXISTS `complaint_asking_for_pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint_asking_for_pets` (
  `ComplaintAP_ID` varchar(100) NOT NULL,
  `Pet_Type` varchar(100) DEFAULT NULL,
  `Pet_Breed` varchar(100) DEFAULT NULL,
  `Pet_Age` varchar(100) DEFAULT NULL,
  `Pet_Count` varchar(100) DEFAULT NULL,
  `ComplaintAP_Detail` varchar(100) DEFAULT NULL,
  `Tenant_ID` int DEFAULT NULL,
  PRIMARY KEY (`ComplaintAP_ID`),
  KEY `complaint_asking_for_pets_tenants_FK` (`Tenant_ID`),
  CONSTRAINT `complaint_asking_for_pets_tenants_FK` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenants` (`Tenant_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint_asking_for_pets`
--

LOCK TABLES `complaint_asking_for_pets` WRITE;
/*!40000 ALTER TABLE `complaint_asking_for_pets` DISABLE KEYS */;
INSERT INTO `complaint_asking_for_pets` VALUES ('CAP01','สุนัข','ชิวาวา (ขนาดเล็ก)','2 ปี','1 ตัว','สุขภาพแข็งแรง ทำวัคซีนครบ',9),('CAP02','แมว','เปอร์เซีย (ขนาดกลาง)','3 ปี','2 ตัว','เลี้ยงในห้องตลอดเวลา',10),('CAP03','กระต่าย','ฮอลแลนด์ลอป (ขนาดเล็ก)','1 ปี','1 ตัว','มีกรงเลี้ยงและอุปกรณ์พร้อม',11),('CAP04','ปลา','ปลากัดไทย (ขนาดเล็ก)','6 เดือน',' 3 ตัว','เลี้ยงในตู้ปลาขนาดเล็ก',12);
/*!40000 ALTER TABLE `complaint_asking_for_pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaint_general`
--

DROP TABLE IF EXISTS `complaint_general`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint_general` (
  `ComplaintG_ID` varchar(100) NOT NULL,
  `Complaint_type` varchar(100) DEFAULT NULL,
  `Complaint_Detail` text,
  `Tenant_ID` int DEFAULT NULL,
  PRIMARY KEY (`ComplaintG_ID`),
  KEY `complaint_general_tenants_FK` (`Tenant_ID`),
  CONSTRAINT `complaint_general_tenants_FK` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenants` (`Tenant_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint_general`
--

LOCK TABLES `complaint_general` WRITE;
/*!40000 ALTER TABLE `complaint_general` DISABLE KEYS */;
INSERT INTO `complaint_general` VALUES ('CG001','แจ้งปัญหาเกี่ยวกับหอพัก','ห้องข้างๆเสียงดัง',1),('CG002','แจ้งปัญหาเกี่ยวกับหอพัก','ขอซ่อมไฟในห้องน้ำ',2),('CG003','ขอคำชี้แจงเกี่ยวกับค่าใช้จ่าย','ขอคืนเงินค่ามัดจำ',3),('CG004','แจ้งปัญหาเกี่ยวกับหอพัก',' ค่าน้ำของเดือนนี้สูงผิดปกติ ขอให้ตรวจสอบ',4);
/*!40000 ALTER TABLE `complaint_general` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaint_overstay_request`
--

DROP TABLE IF EXISTS `complaint_overstay_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint_overstay_request` (
  `ComplaintOR_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Original_End_Date` varchar(100) DEFAULT NULL,
  `Requested_Extension` varchar(100) DEFAULT NULL,
  `New_End_Date` varchar(100) DEFAULT NULL,
  `Reason` text,
  `Tenant_ID` int DEFAULT NULL,
  PRIMARY KEY (`ComplaintOR_ID`),
  KEY `complaint_overstay_request_tenants_FK` (`Tenant_ID`),
  CONSTRAINT `complaint_overstay_request_tenants_FK` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenants` (`Tenant_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint_overstay_request`
--

LOCK TABLES `complaint_overstay_request` WRITE;
/*!40000 ALTER TABLE `complaint_overstay_request` DISABLE KEYS */;
INSERT INTO `complaint_overstay_request` VALUES ('COR01','28 กุมภาพันธ์ 2567','1 เดือน','31 มีนาคม 2567',' ยังหาห้องพักใหม่ไม่ได้ ขอเวลาเพิ่ม',6),('COR02','15 มีนาคม 2567','2 เดือน','15 พฤษภาคม 2567','ต้องการอยู่ต่อเพราะยังไม่พร้อมย้ายออก',7),('COR03','30 เมษายน 2567','3 เดือน','31 กรกฎาคม 2567','งานใหม่เริ่มช้ากว่ากำหนด ขอขยายเวลา',8),('COR04','10 กุมภาพันธ์ 2567','1 เดือน','10 มีนาคม 2567','ขอเวลาเพิ่มเติมก่อนย้ายกลับบ้าน',9);
/*!40000 ALTER TABLE `complaint_overstay_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_tenant`
--

DROP TABLE IF EXISTS `contact_tenant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_tenant` (
  `Contact_T_ID` varchar(100) NOT NULL,
  `Phone` varchar(100) DEFAULT NULL,
  `Gmail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Contact_T_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_tenant`
--

LOCK TABLES `contact_tenant` WRITE;
/*!40000 ALTER TABLE `contact_tenant` DISABLE KEYS */;
INSERT INTO `contact_tenant` VALUES ('CT001','081-234-5678','somchai123@gmail.com'),('CT002','092-345-6789','naruemon.suk@gmail.com'),('CT003','086-789-0123','wasan99@hotmail.com'),('CT004','080-456-7890	','pichai.mit@gmail.com'),('CT005','095-678-9012','jiraporn.cm@yahoo.com'),('CT006','095-688-9012','w11@hotmail.com'),('CT007','095-999-9012','w22@hotmail.com'),('CT008','095-777-9012','w33@hotmail.com'),('CT009','095-555-9012','w4499@hotmail.com'),('CT010','095-222-9012','w5599@hotmail.com'),('CT011','095-111-9012','w66@hotmail.com'),('CT012','095-888-9012','w77@hotmail.com'),('CT013','095-444-9012','w559@hotmail.com'),('CT014','095-333-9012','w77@hotmail.com');
/*!40000 ALTER TABLE `contact_tenant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electricity_bill`
--

DROP TABLE IF EXISTS `electricity_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electricity_bill` (
  `Electric_ID` int NOT NULL AUTO_INCREMENT,
  `Price` int DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `Tenant_ID` int DEFAULT NULL,
  `Proof_of_payment` longblob,
  PRIMARY KEY (`Electric_ID`),
  KEY `electricity_bill_tenants_FK` (`Tenant_ID`),
  CONSTRAINT `electricity_bill_tenants_FK` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenants` (`Tenant_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electricity_bill`
--

LOCK TABLES `electricity_bill` WRITE;
/*!40000 ALTER TABLE `electricity_bill` DISABLE KEYS */;
INSERT INTO `electricity_bill` VALUES (1,1163,'ชำระแล้ว',1,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(2,1042,'ชำระแล้ว',2,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(3,863,'ชำระแล้ว',3,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(4,1320,'ชำระแล้ว',4,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(5,395,'ชำระแล้ว',5,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(6,784,'ชำระแล้ว',6,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(7,530,'ชำระแล้ว',7,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(8,1048,'ชำระแล้ว',8,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(9,1494,'ชำระแล้ว',9,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(10,840,'ชำระแล้ว',10,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(11,1359,'ชำระแล้ว',11,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(12,824,'ชำระแล้ว',12,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(13,1483,'ชำระแล้ว',13,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(14,1409,'ชำระแล้ว',14,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj');
/*!40000 ALTER TABLE `electricity_bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monthly_usage`
--

DROP TABLE IF EXISTS `monthly_usage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monthly_usage` (
  `Monthly_ID` int NOT NULL,
  `Year` varchar(100) COLLATE utf8mb4_bg_0900_as_cs DEFAULT NULL,
  `Total_Water` decimal(10,0) DEFAULT NULL,
  `Total_Electric` decimal(10,0) DEFAULT NULL,
  `Month_Name` varchar(100) COLLATE utf8mb4_bg_0900_as_cs DEFAULT NULL,
  PRIMARY KEY (`Monthly_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bg_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthly_usage`
--

LOCK TABLES `monthly_usage` WRITE;
/*!40000 ALTER TABLE `monthly_usage` DISABLE KEYS */;
INSERT INTO `monthly_usage` VALUES (1,'2567',125000,254103,'มกราคม'),(2,'2567',134500,169497,'กุมภาพันธ์'),(3,'2567',120000,165432,'มีนาคม'),(4,'2567',115000,112534,'เมษายน'),(5,'2567',130000,127457,'พฤษภาคม'),(6,'2567',140000,214509,'มิถุนายน'),(7,'2567',145000,224537,'กรกฎาคม'),(8,'2567',135000,194564,'สิงหาคม'),(9,'2567',138000,185456,'กันยายน'),(10,'2567',142000,179945,'ตุลาคม'),(11,'2567',136000,172719,'พฤศจิกายน'),(12,'2567',139000,175891,'ธันวาคม');
/*!40000 ALTER TABLE `monthly_usage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officer`
--

DROP TABLE IF EXISTS `officer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `officer` (
  `Officer_ID` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `Address` text,
  `position` varchar(100) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  PRIMARY KEY (`Officer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officer`
--

LOCK TABLES `officer` WRITE;
/*!40000 ALTER TABLE `officer` DISABLE KEYS */;
INSERT INTO `officer` VALUES (1,'สมชาย','อินทร์สุข','123 หมู่ 5 ถนนพหลโยธิน ตำบลลาดยาว อำเภอจตุจักร กรุงเทพมหานคร 10900','ยาม',15000),(2,'นฤมล','สุขสม','45/12 ซอยสุขุมวิท 24 แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110','แม่บ้าน',15000),(3,'วสันต์','พงษ์ไพบูลย์','99/3 หมู่บ้านสวนทองวิลล่า ตำบลบางรักพัฒนา อำเภอบางบัวทอง นนทบุรี 11110','แม่บ้าน',15000),(4,'พิชัย','มีสุข','88 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมือง นครราชสีมา 30000','พนักงาน',35000),(5,'จิราภรณ์','เชียงใหม่','777/9 หมู่ 2 ตำบลหนองหอย อำเภอเมือง เชียงใหม่ 50000','พนักงาน',35000),(6,'พีรพัฒน์','จินดาวงษ์','17/4 หมู่9 ต.ตะคร้ำเอน อ.ท่ามะกา จ.กาญจนบุรี','ผู้จัดการ',40000);
/*!40000 ALTER TABLE `officer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rent_bill`
--

DROP TABLE IF EXISTS `rent_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rent_bill` (
  `Rent_ID` int NOT NULL AUTO_INCREMENT,
  `Price` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `Tenant_ID` int DEFAULT NULL,
  `Proof_of_payment` longblob,
  PRIMARY KEY (`Rent_ID`),
  KEY `rent_bill_tenants_FK` (`Tenant_ID`),
  CONSTRAINT `rent_bill_tenants_FK` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenants` (`Tenant_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rent_bill`
--

LOCK TABLES `rent_bill` WRITE;
/*!40000 ALTER TABLE `rent_bill` DISABLE KEYS */;
INSERT INTO `rent_bill` VALUES (1,'4500','ชำระแล้ว',1,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(2,'4500','ชำระแล้ว',2,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(3,'4500','ชำระแล้ว',3,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(4,'4500','ชำระแล้ว',4,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(5,'4500','ชำระแล้ว',5,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(6,'4500','ชำระแล้ว',6,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(7,'4500','ชำระแล้ว',7,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(8,'4500','ชำระแล้ว',8,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(9,'4500','ชำระแล้ว',9,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(10,'4500','ชำระแล้ว',10,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(11,'4500','ชำระแล้ว',11,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(12,'4500','ชำระแล้ว',12,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(13,'4500','ชำระแล้ว',13,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(14,'4500','ชำระแล้ว',14,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj');
/*!40000 ALTER TABLE `rent_bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `Room_ID` varchar(100) NOT NULL,
  `Contract_period` varchar(100) DEFAULT NULL,
  `Start_date_of_stay` date DEFAULT NULL,
  `Contract_end_date` date DEFAULT NULL,
  `Number_of_tenants` int DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `Tenant_ID` int DEFAULT NULL,
  PRIMARY KEY (`Room_ID`),
  KEY `rooms_tenants_FK` (`Tenant_ID`),
  CONSTRAINT `rooms_tenants_FK` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenants` (`Tenant_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES ('201-A','',NULL,NULL,0,'ว่าง',NULL),('201-B','4ปี','2023-01-01','2027-01-01',2,'ไม่ว่าง',1),('201-C','4ปี','2023-01-02','2027-01-02',2,'ไม่ว่าง',2),('202-A','4ปี','2023-11-05','2027-11-05',1,'ไม่ว่าง',3),('203-B','',NULL,NULL,0,'ว่าง',NULL),('204-C','4ปี','2023-07-06','2027-07-06',1,'ไม่ว่าง',4),('205-A','4ปี','2023-04-14','2027-04-14',1,'ไม่ว่าง',5),('205-B','4ปี','2023-12-06','2027-12-06',1,'ไม่ว่าง',6),('205-C','',NULL,NULL,0,'ว่าง',NULL),('206-A','',NULL,NULL,0,'ว่าง',NULL),('206-B','4ปี','2023-11-30','2027-11-30',1,'ไม่ว่าง',7),('206-C','4ปี','2023-01-28','2027-01-28',2,'ไม่ว่าง',8),('207-A','4ปี','2023-09-07','2027-09-07',1,'ไม่ว่าง',9),('207-B','',NULL,NULL,0,'ว่าง',NULL),('207-C','4ปี','2023-09-07','2027-09-07',1,'ไม่ว่าง',10),('208-A','4ปี','2023-04-20','2027-04-20',1,'ไม่ว่าง',11),('208-B','',NULL,NULL,0,'ว่าง',NULL),('208-C','4ปี','2023-02-26','2027-02-26',1,'ไม่ว่าง',12),('209-A','4ปี','2023-02-19','2027-02-19',1,'ไม่ว่าง',13),('209-B','4ปี','2023-12-30','2027-12-30',1,'ไม่ว่าง',14);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tenants`
--

DROP TABLE IF EXISTS `tenants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tenants` (
  `Tenant_ID` int NOT NULL AUTO_INCREMENT,
  `Ten_name` varchar(100) DEFAULT NULL,
  `Address` text,
  `Room_ID` varchar(100) DEFAULT NULL,
  `Contact_T_ID` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Tenant_ID`),
  KEY `tenants_rooms_FK` (`Room_ID`),
  KEY `tenants_contact_tenant_FK` (`Contact_T_ID`),
  CONSTRAINT `tenants_contact_tenant_FK` FOREIGN KEY (`Contact_T_ID`) REFERENCES `contact_tenant` (`Contact_T_ID`),
  CONSTRAINT `tenants_rooms_FK` FOREIGN KEY (`Room_ID`) REFERENCES `rooms` (`Room_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tenants`
--

LOCK TABLES `tenants` WRITE;
/*!40000 ALTER TABLE `tenants` DISABLE KEYS */;
INSERT INTO `tenants` VALUES (1,'เจมส์บอล','123 หมู่ 5 ถนนพหลโยธิน ตำบลลาดยาว อำเภอจตุจักร จังหวัดกรุงเทพมหานคร 10900','201-B','CT001'),(2,'โฟน','777/9 หมู่ 2 ตำบลหนองหอย อำเภอเมือง จังหวัดเชียงใหม่ 50000','201-C','CT002'),(3,'โอม','99/3 หมู่บ้านสวนทองวิลล่า ตำบลบางรักพัฒนา อำเภอบางบัวทอง จังหวัดนนทบุรี 11110','202-A','CT003'),(4,'ออฟ','88 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000','204-C','CT004'),(5,'เชฟ','777/9 หมู่ 2 ตำบลหนองหอย อำเภอเมือง จังหวัดเชียงใหม่ 50000','205-A','CT005'),(6,'โจ','123 หมู่ 5 ถนนพหลโยธิน ตำบลลาดยาว อำเภอจตุจักร จังหวัดกรุงเทพมหานคร 10900\r\n45/12 ซอยสุขุมวิท 24 แขวงคลองตัน เขตคลองเตย จังหวัดกรุงเทพมหานคร 10110','205-B','CT006'),(7,'จิม','123 หมู่ 5 ถนนพหลโยธิน ตำบลลาดยาว อำเภอจตุจักร จังหวัดกรุงเทพมหานคร 10900\r\n45/12 ซอยสุขุมวิท 24 แขวงคลองตัน เขตคลองเตย จังหวัดกรุงเทพมหานคร 10110','206-B','CT007'),(8,'รีม','123 หมู่ 5 ถนนพหลโยธิน ตำบลลาดยาว อำเภอจตุจักร จังหวัดกรุงเทพมหานคร 10900\r\n45/12 ซอยสุขุมวิท 24 แขวงคลองตัน เขตคลองเตย จังหวัดกรุงเทพมหานคร 10110','206-C','CT008'),(9,'อัม','99/3 หมู่บ้านสวนทองวิลล่า ตำบลบางรักพัฒนา อำเภอบางบัวทอง จังหวัดนนทบุรี 11110\r\n88 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000','207-A','CT009'),(10,'กัน','99/3 หมู่บ้านสวนทองวิลล่า ตำบลบางรักพัฒนา อำเภอบางบัวทอง จังหวัดนนทบุรี 11110\r\n88 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000','207-C','CT010'),(11,'โด','45/12 ซอยสุขุมวิท 24 แขวงคลองตัน เขตคลองเตย จังหวัดกรุงเทพมหานคร 10110','208-A','CT011'),(12,'ดี','777/9 หมู่ 2 ตำบลหนองหอย อำเภอเมือง จังหวัดเชียงใหม่ 50000','208-C','CT012'),(13,'ขิม','777/9 หมู่ 2 ตำบลหนองหอย อำเภอเมือง จังหวัดเชียงใหม่ 50000','209-A','CT013'),(14,'ขา','45/12 ซอยสุขุมวิท 24 แขวงคลองตัน เขตคลองเตย จังหวัดกรุงเทพมหานคร 10110','209-B','CT014');
/*!40000 ALTER TABLE `tenants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `water_bill`
--

DROP TABLE IF EXISTS `water_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `water_bill` (
  `Water_ID` int NOT NULL AUTO_INCREMENT,
  `Price` int DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `Tenant_ID` int DEFAULT NULL,
  `Proof_of_payment` longblob,
  PRIMARY KEY (`Water_ID`),
  KEY `water_bill_tenants_FK` (`Tenant_ID`),
  CONSTRAINT `water_bill_tenants_FK` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenants` (`Tenant_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `water_bill`
--

LOCK TABLES `water_bill` WRITE;
/*!40000 ALTER TABLE `water_bill` DISABLE KEYS */;
INSERT INTO `water_bill` VALUES (1,202,'ชำระแล้ว',1,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(2,448,'ชำระแล้ว',2,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(3,370,'ชำระแล้ว',3,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(4,206,'ชำระแล้ว',4,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(5,171,'ชำระแล้ว',5,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(6,288,'ชำระแล้ว',6,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(7,120,'ชำระแล้ว',7,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(8,202,'ชำระแล้ว',8,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(9,221,'ชำระแล้ว',9,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(10,314,'ชำระแล้ว',10,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(11,430,'ชำระแล้ว',11,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(12,187,'ชำระแล้ว',12,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(13,202,'ชำระแล้ว',13,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj'),(14,448,'ชำระแล้ว',14,_binary 'https://drive.google.com/thumbnail?id=12WDv7zMl1tVZdTP54sv7601JfckuPTTj');
/*!40000 ALTER TABLE `water_bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dormitory'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-27  1:27:36
