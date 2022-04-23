# StudentIn client

| Key                    | Value                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Owner                  | Aki Kurvinen                                                                                                                   |
| Description            | StudentIn Web App                                                                                                              |
| Deploy Server          | https://studentin-client.herokuapp.com                                                                                         |
| Detailed Frontend Docs | /docs/index.html                                                                                                               |
| also at Heroku         | https://studentin-client.herokuapp.com/docs/                                                                                   |
| Video demo             | https://youtu.be/Db6j-8h80ZE                                                                                                   |
| Summary                | StudentIn is an inclusive, cross-industry project team grouping app,<br>for students with various skill sets and skill levels. |

## Installation

```
$ npm install
$ npm start
```

## Testing

Command line testing with coverage

```
$ npx cypress run
```

Testing with Cypress GUI

```
$ npx cypress open
```

### Local test result

![Local test result](https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/test_cypress_local.JPG)

### Against heroku.com test result

![Heroku test result](https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/cypress_online_heroku.JPG)

## Releases

### R1

Functional application and necessary components

### R2

Bug fixes, testing and documentation

### R3

Google login feature

## App structure

### components

    - AddNewProject
    - BottomNav
    - EditableField
    - EditSkills
    - FetchUsers
    - Login
    - MyDetails
    - MyProfile
    - MyProjects
    - NotFound
    - Project
    - ProjectMembers
    - Search
    - Settings
    - Signup
    - SvgIcon
    - TopNav
    - http-hook
    - validators

### layouts

    - App.js

### pages

    - MyProfile
    - MyProjects
    - Signup
    - Settings
    - Search

### routes

    - /
    - /projects
    - /settings
    - /search

## Screenshots

<a href="url"><img src="https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/glogin.png" align="left" height="640" width="360" alt="Screenshot 1"></a>
<a href="url"><img src="https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/gsignup.png" align="left" height="640" width="360" alt="Screenshot 2"></a>

<a href="url"><img src="https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/myprofile.png" align="left" height="640" width="360" alt="Screenshot 3"></a>
<a href="url"><img src="https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/myskills.png" align="left" height="640" width="360" alt="Screenshot 4"></a>

<a href="url"><img src="https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/myprojects.png" align="left" height="640" width="360" alt="Screenshot 5"></a>
<a href="url"><img src="https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/project.png" align="left" height="640" width="360" alt="Screenshot 6"></a>

<a href="url"><img src="https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/search.png" align="left" height="640" width="360" alt="Screenshot 7"></a>
<a href="url"><img src="https://github.com/AkiKurvinen/studentin-client/blob/master/screenshots/settings.png" align="left" height="640" width="360" alt="Screenshot 8"></a>
