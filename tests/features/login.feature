Feature: user login

  Scenario Outline: login with valid and invalid credentials
    Given the user opens the login page
    When the user selects the option "<option>"

    Examples:
      | option            |
      | Form Fields       |
      | Window Operations |
      | Iframes           |
