Feature:Cabin photo Publish 

  Background:
    Given the user logs into the Sidekick portal

  @cabinphoto
  Scenario: Cabin photo Publish process
    When navigate into Cabin photos
    And Choose filter in Cabin photos Overview
    And upload Cabin photos
    Then Verify and Approved the Cabin Photo In Review Section
    Then Verify and Publish the Cabin Photo In Approved Section
    Then Verify and Published Cabin Photo In Published Section
