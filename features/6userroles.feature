Feature: Admin User Roles validation in Sidekick Portal

  @userroles
  Scenario: Admin User Role - Add, Edit, Duplicate, Toggle Status, and Delete
    When I add a new user role with defined permissions
      | Section      | Permission           | Level        |
      | Accounts     | Select All           | Select All   |
      | Admin        | Roles                | Full         |
      | Dashboards   | Registration         | View Only    |
      | Reports      | Select All           | Select All   |
      | Settings     | Settings - CampLife  | View Only    |
      | Surveys      | Dashboards           | Full         |
      | Tableau      | Select All           | Select All   |
      | Tools        | Cabin Photo Approval | Full         |

    And I search that user role for edit with new permissions
      | Section      | Permission | Level      |
      | Accounts     | Select All | Select All |
      | Admin        | Select All | Select All |
      | Dashboards   | Select All | Select All |
      | Reports      | Select All | Select All |
      | Settings     | Select All | Select All |
      | Surveys      | Select All | Select All |
      | Tableau      | Select All | Select All |
      | Tools        | Select All | Select All |

    And I search that user role and duplicate it
    And I search that user role and delete it
    And I search that duplicate user role and delete it
