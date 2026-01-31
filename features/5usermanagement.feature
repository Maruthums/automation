Feature: Admin Users validation in Sidekick Portal

  @usermanagement
  Scenario: Admin User lifecycle - Add, Search, Edit, Toggle Status, and Delete
    When I add a new user with random details
    Then I can search and edit that user with updated details
    And I can change the status of that user
    And I can delete that user from the Sidekick portal
