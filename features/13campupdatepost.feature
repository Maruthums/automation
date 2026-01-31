Feature: Camp Update Posts in Sidekick Portal

  @campupdateposts
  Scenario Outline: Camp Update Posts - Add, Search, Edit, Duplicate and Delete
    When Camp Update Posts Base Screen
    And Create Camp Update Posts
    And View Camp Update Posts
    And Edit Camp Update Posts
    And View Publish Details, Edit, Duplicate, Hide and Delete
    And Delete Duplicate Posts