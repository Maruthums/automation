Feature: Settings Page
  Verify that users can view and edit the settings page successfully.

  Background:
    Given the user logs into the Sidekick portal

  @settings
  Scenario Outline: Verify settings page edit option
    Then The user can edit the setting page "<FaceSize>", "<StartAge>" , "<Year>"
    And The user can edit the publishing page 

    Examples:
      | FaceSize | StartAge | Year |
      | 0.3      | 6        | 2    |
