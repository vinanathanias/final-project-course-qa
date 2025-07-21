# cypress/features/pim.feature

Feature: PIM Page Testing

  Background: User is logged in
    Given user is on the login page
    When user logs in using credentials from "orangehrm_credentials"
    Then user should see the dashboard page

  Scenario: Search an employee with ID
    Given user navigates to PIM page
    When user search employee with Id from "pim" file
    Then the user id from "pim" file should appear in the user list


  Scenario: Attempt to delete a user
    Given user navigates to PIM page
    When user tries to delete an existing user
    Then the success popup should appear
