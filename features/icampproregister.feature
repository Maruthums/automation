Feature: iCampPro Accounts Creation and Registration in Portal

  @icampproregister
  Scenario Outline: iCampPro campers registered in Registration portal properly
    Given the user logs into the iCampPro portal
    Then the page title should be "Dashboard"
    And Click Add Household member link and create the campers with data
    |  region        | campName        | campType    | campYear | dateLabel | isTwoWeek | childUsersData                                                                                      | mailStreet                                        | mailCity | mailState | mailZip |
    | East Texas     | City-Alpine     | Day Camp    | 2025     | Week      | false     | [{"dateOfBirth":"05/07/2017","grade":"6th grade"}]                                                  | 102 N College Ave Suite 404, Tyler, TX 75702, USA | Tyler    | Texas     | 75702   |
    | East Texas  | Woods     | Family Camp | 2025     | Week      |           | [{"dateOfBirth":"05/07/2017","grade":"7th grade"},{"dateOfBirth":"03/08/2017","grade":"6th grade"}] | 102 N College Ave Suite 404, Tyler, TX 75702, USA | Tyler    | Texas     | 75702   |
    | East Texas     | Towers          | Youth Camp  | 2025     | Week      | false     | [{"dateOfBirth":"05/07/2017","grade":"6th grade"}]                                                  | 102 N College Ave Suite 404, Tyler, TX 75702, USA | Tyler    | Texas     | 75702   |
    | East Texas     | Shores Overflow | Youth Camp  | 2025     | Session   | true      | [{"dateOfBirth":"05/07/2017","grade":"6th grade"}]                                                  | 102 N College Ave Suite 404, Tyler, TX 75702, USA | Tyler    | Texas     | 75702   |
