# cypress/features/admin.feature

Feature: Admin User Management

  Background: User is logged in
    Given user is on the login page
    When user logs in using credentials from "orangehrm_credentials"
    Then user should see the dashboard page

  Scenario Outline: Add a new user with a specific role
    Given user navigates to Admin page
    When user adds a new user "<newUsername>" with role "<role>" and employee name from "admin" file and status "<status>"
    Then the user "<newUsername>" should appear in the user list

    Examples:
      | newUsername  | role  | status  |
      | cypressUser1 | Admin | Enabled |

  Scenario: Attempt to add user with mismatched passwords
    Given user navigates to Admin page
    When user tries to add a new user "negativeUser" with mismatched passwords and employee name from "admin" file
    Then an error message for mismatched passwords should be displayed
