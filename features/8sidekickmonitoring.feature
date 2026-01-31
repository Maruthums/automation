Feature: Tableau Dashboards Page Functionality

  @sidekickmonitoring
  Scenario: Verify sidekick monitoring page loads and list devices
    Given the user navigates to the Sidekick Monitoring Page via the Tools
    Then validate the sidekick devices list
