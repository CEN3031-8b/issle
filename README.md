# issle :bulb:

![alt text](https://github.com/CEN3031-Group4A/issle/blob/Develop/screenshots/issleteam.JPG)

**CEN3031 Group 4A**

**Members:** Raz Aloni, Salim Chaouqi, Juan Jauregui, Yayati Bagga, Logan Wood, Marie Urmano

**Client:** Dr. Ruzycki

Florida school teachers are required to develop and provide coursework that adheres to educational standards created by the Florida Department of Education. This deters teachers from creating curriculums based on engineering because it is not easy to immediately spot the standards that these topics would fall under. To help teachers create design engineering-based curriculums while staying in line with the standards, we created issle.
Issle (which stands for “integrating standards for students learning engineering”) is planned to provide a simple interface for teachers to create lesson plans while letting them link standards to them as they work. Users will be given hints and examples for all fields inside of a lesson plan framework to ensure that they are able to easily create their projects. Additionally, users will be able to share lesson plans linked to their account as well as view other posted lesson plans.

## Link to deployed site
https://deployissle.herokuapp.com/

## People/organizations involved in the creation of issle
* Bootstrap
  * Used Navbar design, glyphicon, headers, section headers
* CPALMS database
  * Collect and store standards into database on Mongodb
  
## Features

![alt text](https://github.com/CEN3031-Group4A/issle/blob/Develop/screenshots/homepage.JPG)

#### Engineering Design Frame page

![alt text](https://github.com/CEN3031-Group4A/issle/blob/Develop/screenshots/designpage.JPG)

This page allows teachers to create their own engineering design projects, add multiple subjects to their projects, and link standards. These projects can be saved as drafts, and the user also has the option to mark a project as private (in which they will be the only user allowed to access the project).

#### User Accounts

![alt text](https://github.com/CEN3031-Group4A/issle/blob/Develop/screenshots/profilepage.jpg)

issle also supports unique user accounts where each user can create, modify, and delete their own projects. Other settings associated with user accounts include changing user settings, such as school, username, email, and password, as well as changing a profile picture. Through the **My Projects** header in the user account page, users can also print out their projects to list them in their physical lesson plans.

#### Search Standards

![alt text](https://github.com/CEN3031-Group4A/issle/blob/Develop/screenshots/searchstandards.JPG)

A search standards system was also created, where teachers can look up Florida educational standards based on a grade and subject or by a keyword. The search will retrieve Florida common core standards to be referenced by the engineering design projects created by the user.

#### Search Projects

![alt text](https://github.com/CEN3031-Group4A/issle/blob/Develop/screenshots/searchprojects.JPG)

The search projects page provides a way for teachers to look up public projects that meet a certain standard, name, or keyword.

#### User Support

![alt text](https://github.com/CEN3031-Group4A/issle/blob/Develop/screenshots/supportpage.JPG)

User support in issle consists of an example page with framework designed for helping teachers understand the process of generating their own project ideas. An FAQ also exists to address common website navigation questions, educational standards, and user settings, referenced in the sidebar of the design engineering frame.
 
## How to run issle locally

Install MEAN.js onto your computer and download the necessary software using [this tutorial.](http://www.bossable.com/303/install-mean-stack/)

Then, pull this repository into your local directory, go into this directory using command line, and type `grunt`.

Type `localhost:3000` into your browser, and issle should be running successfully locally if MEAN communicates that the app is running.

## How to update database and server instructions

In order to update the database and server, update the **local.js** file located in issle's directory. This file currently contains connections to issle's database and image server.






