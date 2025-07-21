# cypress/features/myInfo.feature

Feature: Admin User Management

  Background: User is logged in
    Given user is on the login page
    When user logs in using credentials from "orangehrm_credentials"
    Then user should see the dashboard page

  Scenario Outline: Add a new immigration record for user
    Given user navigates to myInfo page
    And user navigates to "Immigration" tab
    When user clicks add in "Assigned Immigration Records"
    And user adds a new immigration "<document>" with number "<number>", issued date "<issuedDate>" and expiry date "<expiryDate>" and submits form
    Then the success popup should appear
    Examples:
      | document  | number  | issuedDate    | expiryDate |
      | Passport | 10101010 | 2005-10-10 | 2010-10-10 |
      | Visa | 20202020 | 2003-12-22 | 2008-12-22 |

  Scenario: Delete user's immigration record
    Given user navigates to myInfo page
    And user navigates to "Immigration" tab
    When user selects the following immigration numbers to delete:
      | immigrationNumbers |
      | 10101010 |
      | 20202020 |
    Then the success popup should appear
