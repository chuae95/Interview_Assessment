To initialize the project, kindly run the "npm start" command. The data will be automatically entered by using the build method of Sequelize in the router.js file.

Several models have been created in the models folder. These include class, subject and profile JS models.
2 extra models (profileClass and studentClass) have been to capture information about
i) what classes and subjects each teacher teach in school
ii) what classes and subjects each students take in school
respectively.

In the models, the emails have been made a unique field as per the requirements. Similarly, subjectCode and classCode have also been added as a unique field for each model.
If the user tries to submit invalid information(missing or repetitions), an error with status code (400) would be returned to the user.

As per the model provided in the first part, we want to allow the users to post a single isntance of a teacher, teaching a particular subject for a class of students.
For the first part of the assignment, the profileClass model would be checked first to see if the combination of teacher, subject and class is available yet. If no, an instance would be
created in the profileClass table. For each student that has been mentioned in the request.body, a record will be added to the studentClass model, along with an ID for the teacher who is teaching that subject for the class.

By using the IDs of each instance, we can retrieve the information for each profileCLass instance model easily and return it in a JSON body.

For the second part of the assigment, only the profileClass is relevant. By using the findAndCountAll method available for models, we can generate a record of each teacher's subjects and classes
by grouping the Teachers' and Subjects' ID together. Using this, information from the relevant tables have been extracted and used to create the json body which the user can use for his analysis.

Below contains the original description for the assignment:
# Interview Assignment (v2.0.1)

This package contains the base code for the interview assignment.<br>
You can add additional library that will aid you in fulfiling the requirements.
<br>
<br>
Please read through NodeJS_Assessment.pdf carefully before you attempt.



## Prerequisites
- NodeJS v12.x.x
- Docker

<br>

## Package Structure
| S/N | Name | Type | Description |
|-----|------|------|-------------|
| 1 | javascript | dir | This holds the base code which you should extend in order to fulfil the requirements |
| 2 | NodeJS_Assessment.pdf | file | The specification for the assignment |
| 3 | README.md | file | This file |
| 4 | school-administration-system.postman_collection.json | file | Postman script for uploading file |

<br>

## Exposed Port
| S/N | Application | Exposed Port |
|-----|-------------|--------------|
| 1 | database | 33306 |
| 2 | applicaiton | 3000 |

<br>

## Commands
All the commands listed should be ran in ./javascript directory.

### Installing dependencies
```bash
npm install
```

<br>

### Starting Project
Starting the project in local environment.
This will start all the dependencies services i.e. database.
```bash
npm start
```

<br>

### Running in watch mode
This will start the application in watch mode.
```bash
npm run start:dev
```

<br>

### Check local application is started
You should be able to call (GET) the following endpoint and get a 200 response

```
http://localhost:3000/api/healthcheck
```

<br>

## Extras

### Database
You can place your database migration scripts in javascript/database folder. <br>
It will be ran the first time MySQL docker container is first initialised. <br><br>
Please provide the instruction on how to initialise the database if you are not using the above method.

<br>

## FAQ

### Error when starting up
If you encounter the following error when running ```npm start```, it is due to the slow startup of your database container.<br>
Please run ```npm start``` again.

```
[server.js]	ERROR	SequelizeConnectionError: Connection lost: The server closed the connection.
[server.js]	ERROR	Unable to start application
```
