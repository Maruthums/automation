Feature: Tableau Dashboards Page Functionality

  @tableaudashboards
  Scenario: Verify user can add, edit, favorite, and unfavorite dashboards
    Given the user navigates to the Tableau Dashboards Page via the Tableau sidebar
    When the user clicks on "NEW DASHBOARD" button
    Then the "New Dashboard" modal should open
    And the user fills all the fields
    And the same newly added group should be selected
    And the user clicks on "SAVE" button   
    And the user clicks on "COLLAPSE ALL" button all groups should collapse
    And if the user clicks on "EXPAND ALL" button all groups should expand
    And user favorite the created dashboard
    And user edit the created dashboard
    And user open in tableau with the created dashboard
    And user delete the created dashboard
    And check if the user can rename and delete groups

