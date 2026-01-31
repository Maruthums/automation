Feature: Dashboard of Pinecove Sidekick Admin Portal

  Background:
    Given the user logs into the Sidekick portal

  @dashboard
  Scenario Outline: Dashboard with Production/Staging iOS/Andriod mobile applications version(s)
    Then the page header should be "<PageHeader>"
    And click the "<ButtonName>" button
    And the default button text should display "<ButtonText>"
    And Under Sidekick Mobile tab select latest version and download the Sidekick APK file
    And Under the CamLife tab select latest version and download the CampLife APK file

    Examples:
    |PageHeader |ButtonName        |ButtonText|TabText1       |TabText2|
    |Dashboard  |Installation Guide|Staging   |Sidekick Mobile|CampLife|