## CYPHERX TASK


## Setup
1. Clone or fork the project - 
   https://github.com/Kashyap-Rishi/CYPHERX_task.git

2. Install react through vite - 
   $ npm create vite@latest

3. Go to your project directory -
   cd my-project

4. Now run the following command to install dependecies and run the server - 
   npm install
   npm run dev



## Delpoy

 The website is deployed on netlify - https://cypher-site-kashyap.netlify.app/



## Code Overview

In SRC FOLDER we have two folders :-

1. COMPONENTS
 
a. Cards.jsx - Consists of CardItem components with all mapped data from the api according to group and order

b. CardItems.jsx - Resusable single card components containing all given data.


2. CONTEXT

a. DataContext - React Context API hooks to fetch data from API and making it available to every components

b. ThemeContext - React Context hook to toggle dark and light mode across the website.



## Logic implemented

1. GROUPING DATA 

a. First we check the grouping option whether it is "Status", "User" or "Priority"

b. Then we push the matching tickets condition accordingly and create array consisting of groups consisting of same priority or status or user in one group

c. Finally we map the tickets according to different groups created


2. ORDERING DATA 

a. For title sorting - localeCompare is a method available on strings in JavaScript that compares two strings based on their Unicode values.

b. For priority sorting - sort((a, b) => b.priority - a.priority) : code sorts the array in descending order based on the priority property of the elements


3. SESSION STORAGE ON RELOAD 

Used localStorage to store and retrieve the selected grouping and ordering options :

a.We use localStorage.getItem while initialising grouping and ordering options to store data.

b.We use localStorage.setItem to retrieve data which will be called every time under useEffect hook.



