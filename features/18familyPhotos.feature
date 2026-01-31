Feature:Family photo Publish 

  Background:
    Given the user logs into the Sidekick portal

  @familyphoto
  Scenario: Family photo Publish process
    When navigate into Family photos
    And Choose filter in family photos Overview
    And upload Family photos
    Then Verify and Approved the family Photo In Review Section
    Then Verify and Publish the family Photo In Approved Section
    Then Verify and Published family Photo In Published Section
