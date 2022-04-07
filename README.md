Clone this repo.
Install MySQL macos : brew install mysql
Run the sql server : mysql.server start
Connect to server : mysql --user=root
Create database on the sql terminal : CREATE database groupomania;
Quit sql terminal : quit;
Go to config file : cd back/config/
Import database script : mysql --user=root groupomania < ./database.sql
Check database : mysql --user=root use groupomania; show tables;
You should have :

Tables_in_groupomania

comments
posts
users
3 rows in set (0,01 sec)

From within the project folder, go to the Back(back-end) with cd back(back-end) then run npm install. Install globaly nodemon : npm i -g nodemon You can run the server with nodemon server.

In another terminal, go to the folder Front(front-end) with cd front(front-end) and run npm install then npm start. The server should be run on localhost on port 3000.
