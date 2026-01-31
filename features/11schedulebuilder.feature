Feature: My Week Schedule Builder for Family Camps in Sidekick Portal

  @schedulebuilder
  Scenario Outline: Schedule Builder - Add, Search, Edit, Duplicate and Delete
    When add a new schedule builder for a Family Camp
      | Builder Element |
      | General         |
      | Cove Kids       |
      | Crew            |
      | Impact          |
    Then search and edit the schedule builder
      | Builder Element |
      | General         |
    And duplicate the schedule builder
      | Builder Element |
      | General         |
    And delete the schedule builder in our sidekick portal
    And search that duplicate schedule builder and delete it in our sidekick portal
