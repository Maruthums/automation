Feature: Staff Accounts validation in Sidekick Portal

  @staffaccounts
  Scenario Outline: Staff Accounts validation & Headshots upload process
    Given the user login to the iCampPro portal
    Then the staff should be hired status
    When Check the staffs and headshots upload in sidekick portal
    And Check the staffs and headshots remove in sidekick portal