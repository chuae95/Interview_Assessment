To initialize the project, kindly run the "npm start" command. The data will be automatically entered by using the build method of Sequelize in the router.js file.

Several models have been created in the models folder. These include class, subject and profile JS models.
2 extra models (profileClass and studentClass) have been to capture information about
i) what classes and subjects each teacher teach in school
ii) what classes and subjects each students take in school
respectively.

In the models, the emails have been made a unique field as per the requirements. Similarly, subjectCode and classCode have also been added as a unique field for each model.
If the user tries to submit invalid information(missing or repetitions), an error with status code (400) would be returned to the user.

As per the model provided in the first part, we want to allow the users to post a single instance of a teacher, teaching a particular subject for a class of students.
For the first part of the assignment, the profileClass model would be checked first to see if the combination of teacher, subject and class is available yet. If no, an instance would be
created in the profileClass table. For each student that has been mentioned in the request.body, a record will be added to the studentClass model, along with an ID for the teacher who is teaching that subject for the class.

By using the IDs of each instance, we can retrieve the information for each profileCLass instance model easily and return it in a JSON body.

For the second part of the assigment, only the profileClass is relevant. By using the findAndCountAll method available for models, we can generate a record of each teacher's subjects and classes
by grouping the Teachers' and Subjects' ID together. Using this, information from the relevant tables have been extracted and used to create the json body which the user can use for his analysis.
