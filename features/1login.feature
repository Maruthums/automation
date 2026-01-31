Feature: Sidekick Admin Portal Login

  Background:
    Given the user logs into the Sidekick portal

  @login
  Scenario Outline: Login to Sidekick Portal and validate Page Title & Profile Name
    Then the pagetitle should be "<PageTitle>"
    And the logged user info should display "<ProfileName>"

    Examples:
      | PageTitle         | ProfileName |
      | Pine Cove Sidekick | Pinecove KF |
