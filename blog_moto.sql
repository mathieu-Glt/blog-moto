-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 21, 2022 at 02:12 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog_moto`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `Name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `NickName` varchar(30) NOT NULL,
  `Contents` text NOT NULL,
  `CreationTimestamp` date NOT NULL,
  `Post_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Contents` text NOT NULL,
  `Author_Id` int(11) NOT NULL,
  `Categry_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `Title`, `Contents`, `Author_Id`, `Categry_Id`) VALUES
(1, 'Valentino Rossi', 'Valentino Rossi, né le 16 février 1979 à Urbino en Italie, est un pilote de vitesse moto1.\r\n\r\nIl est sacré neuf fois champion du monde en Grand Prix Moto dont sept en catégorie reine (500 cm3, puis Moto GP). Il est surnommé « The Doctor » et porte le numéro 46. Il compte 199 podiums au sein de la discipline.\r\n\r\nPour la saison 2021, il rejoint son compatriote Franco Morbidelli chez Sepang Racing Team, toujours sur une Yamaha.\r\n\r\nLe jeudi 5 août 2021, lors d\'une conférence de presse exceptionnelle du Grand prix de Styrie en Autriche, il annonce mettre un terme à sa carrière de pilote moto à la fin de la saison, pour se consacrer à la course automobile. Il refuse par la même occasion de courir dans sa propre écurie sur Ducati.', 1, 1),
(2, 'Jorge Lorenzo', 'Jorge Lorenzo Guerrero, né le 4 mai 1987 à Palma, dans l\'île de Majorque (Espagne)1, est un pilote de vitesse moto espagnol, double champion du monde 250 cm3 et triple champion du monde MotoGP avec Yamaha en 2010 , 2012 et 2015.\r\n\r\nEn 2017, Il signe avec Ducati. Il a pour équipier Andrea Dovizioso. En deux ans, il remporte trois victoires, quatre pole positions, montant sept fois sur le podium.\r\n\r\nEn 2019, un nouveau défi l\'attend chez Honda avec comme coéquipier Marc Márquez. Après une année difficile marquée par des blessures et des difficultés d\'adaptation avec sa nouvelle machine, il annonce sa retraite sportive avant le dernier grand prix de la saison 2019.', 2, 2),
(3, 'Marc Marquez', 'Marc Márquez i Alentà, né le 17 février 1993 à Cervera (province de Lleida, Espagne), est un pilote de vitesse moto espagnol participant au championnat du monde.\r\n\r\nIl est détenteur de huit titres de champion du monde : en 2010 dans la catégorie 125 cm3, en 2012 en moto2, en 2013, 2014, 2016, 2017, 2018 et 2019 en MotoGP. Il est également, le plus jeune champion du monde de l\'histoire de la catégorie reine. Le 26 mars 2014, il est récompensé lors de la prestigieuse cérémonie des Laureus World Sports Awards, qui honore chaque année les plus grands athlètes de la planète, par le prix de « révélation de l’année »1.\r\n\r\nJeune prodige, il est capable de rattraper sa moto dans des situations désespérées, et détient le plus grand nombre de sauvetages. Ceci est en partie dû à sa position extrême sur la moto : son corps tout entier est en dehors de la selle et son coude (parfois même l\'épaule) touche le sol, ce qui l\'aide en partie à rattraper sa moto. C\'est un style très agressif et très impressionnant dont beaucoup de pilotes souhaitent s\'inspirer. Il est aussi le pilote qui détient le record d\'angle d\'inclinaison (70,8°).', 2, 2),
(4, 'Fabio Quartararro', 'Fabio Quartararo, né le 20 avril 1999 à Nice, est un pilote de moto français participant au championnat du monde MotoGP. Il est le premier Français champion du monde de cette catégorie, dite « reine »1.\r\n\r\nAprès un apprentissage couronné de succès dans le championnat d\'Espagne, il fait ses débuts en 2015 au championnat du monde Moto3 à quinze ans, grâce à une dérogation, et obtient deux pole positions et deux podiums. Grâce à ses résultats obtenus très jeune, il est présenté comme le nouveau prodige de la moto2,3. En 2018, après plusieurs saisons difficiles, il remporte en Moto2 sa première victoire en Grand Prix. Promu en 2019 en MotoGP dans l\'équipe satellite Yamaha, il confirme son potentiel en réalisant six pole positions, sept podiums et en se classant cinquième et meilleur débutant du championnat. Il remporte son premier Grand Prix, à Jerez en Espagne le 19 juillet 2020, une première pour un Français dans la catégorie MotoGP créée en 2002. Une semaine plus tard, il confirme en remportant un second Grand Prix en Andalousie.\r\n\r\nFabio Quartararo domine la saison 2021 avec cinq victoires et dix podiums, si bien qu\'il devient, le 24 octobre à Misano à l\'arrivée du Grand Prix d\'Émilie-Romagne, le premier champion du monde français de MotoGP, à deux courses du terme de la saison.', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `Email` varchar(120) NOT NULL,
  `Password` varchar(120) NOT NULL,
  `Role` varchar(10) NOT NULL,
  `FirstName` varchar(60) NOT NULL,
  `LastName` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id`) REFERENCES `author` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id`) REFERENCES `comment` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
