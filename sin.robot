*** Settings ***
Library           SeleniumLibrary   run_on_failure=Nothing

*** Variables ***
${SERVER}         https://studentin-client.herokuapp.com/
${LOCAL}          http://localhost:3000/
${BROWSER}        Chrome
${DRIVER}         chromedriver.exe
${DELAY}          0.1

${username}     Test
${password}     Test
${email}        Test.User@mail.fi
${title}        admin
${fname}        Tester
${lname}        Useful
${school}       Tuni

*** Test Cases ***
Create Account
    Prepare_browser
    Login_wrong
    Signup_correct
    Logout
    Signup_wrong
    Login_correct
    Edit details
    Edit_first_name
    Edit skills
    Edit projects
Search
    Use_search
Delete Account
    Del_account
    Verify_solved

*** Keywords ***
Prepare_browser
    Open Browser    ${SERVER}    ${BROWSER}   executable_path=${DRIVER}
    Set Selenium Speed    ${DELAY}
Login_wrong
    Wait Until Page Contains Element    xpath://h1[contains(text(), Login )]
    input text    xpath://input[@data-cy="usernameInput"]     wrong
    input text    xpath://input[@data-cy="passwordInput"]     wrong
    Click Button  xpath://input[@data-cy="submitButton"]
    Wait Until Page Contains Element    xpath=//*[contains(text(), "Wrong username or password")]

Login_correct
    Click Button  xpath://button[@data-cy="insteadButton"]
    input text    xpath://input[@data-cy="usernameInput"]     ${username}
    input text    xpath://input[@data-cy="passwordInput"]      ${password}

    click element   xpath://select[@name="title"]
    wait until element is visible   xpath://option[contains(text(),'admin')]
    click element   xpath://option[contains(text(),admin')]

    Click Button  xpath://input[@data-cy="submitButton"]
    Wait Until Page Contains Element    xpath://p[@data-cy="usernameP"]
    Wait Until Page Contains Element    xpath://p[@data-cy="usernameP"][contains(text(), ${username} )]

Signup_correct
    Click Button    xpath://button[@data-cy="insteadButton"]
    input text      xpath://input[@data-cy="usernameInput"]             ${username}
    input text      xpath://input[@data-cy="passwordInput"]             ${password}
    input text      xpath://input[@data-cy="repeatpasswordInput"]       ${password}
    Click element   xpath://input[@data-cy="submitButton"]
    Wait Until Page Contains Element    xpath://p[@data-cy="usernameP"]
    Wait Until Page Contains Element    xpath://p[@data-cy="usernameP"][contains(text(), ${username} )]

Signup_wrong
    Click Button    xpath://button[@data-cy="insteadButton"]
    input text      xpath://input[@data-cy="usernameInput"]    ${username}
    input text      xpath://input[@data-cy="passwordInput"]    ${password}
    input text      xpath://input[@data-cy="repeatpasswordInput"]    ${password}
    Click element   xpath://input[@data-cy="submitButton"]
    Wait Until Page Contains Element    xpath=//*[contains(text(), "Error")]
Logout
    click button    id=logOutButton
    Wait Until Page Contains Element    xpath://h1[contains(text(), Login )]
Edit_first_name
    Wait Until Page Contains Element    xpath://input[@data-cy="fname"]
    Click element   xpath://button[@data-cy="penIconfname"]
    input text      xpath://input[@data-cy="fname"]            ${fname}
    Click element   xpath://button[@data-cy="penIconfname"]
    Textfield Value Should Be    xpath://input[@data-cy="fname"]    ${fname}
Edit_skills
    input text      xpath://input[@data-cy="skillInputField"]            C++
    Click element   xpath://button[@data-cy="addskillButton"]
    Wait Until Page Contains Element    xpath=//*[contains(text(), "C++")]
    Click element   xpath://button[@data-cy="delete-C++-button"]
    Wait Until Page does NOT contain element    xpath://*[text()="C++"]  timeout=5
Edit_projects
    Click element  id=projects_link
    input text      xpath://input[@data-cy="newProjectInput"]        Awesome project
    Click element   xpath://button[@data-cy="addNewPorjectButton"]
    Wait Until Page Contains Element    xpath=//*[contains(text(), 'Awesome project')]
    Click Element    xpath://*[contains(text(), 'Awesome project')]
    Click Element       //button[@class="delProject roundButton"]
    Click button       //button[@data-cy="deleteProject"]
    Wait Until Page does NOT contain element    xpath://*[text()="Awesome project"]  timeout=5
Use_search
    Click element  id=search_link
    Wait Until Page Contains Element    xpath=//*[contains(., "Search")]
    # find project
    click element   id=projects
    input text      id=searchField     Awesome project
    click button    id=searchButton
    Wait Until Page Contains Element    xpath=//table/tbody/tr/td[contains(text(), "Awesome project")]
    # find user
    click element   id=users
    input text      id=searchField     ${username}
    click button    id=searchButton
    Wait Until Page Contains Element    xpath=//table/tbody/tr/td[contains(text(), ${username})]

    # find skill
    click element     id=skills
    input text      id=searchField     C++
    click button    id=searchButton
    Wait Until Page Contains Element    xpath=//table/tbody/tr/td[contains(text(), 'C++')]


Del_account
    Click Link     xpath=//a[@href="/settings"]

    Click Element  id=delAccBtn
    Click Element  id=yesDelAccBtn
    Wait Until Page Contains Element    xpath=//*[contains(., "Return to main page")]
    Click Element     xpath=//*[contains(., "Return to main page")]

Verify_solved
    Close Window
