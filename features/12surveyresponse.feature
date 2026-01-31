Feature: Paper Survey Response Page Functionality

  @surveyresponse
  Scenario: Verify user can access the paper survey response
    Given navigates the user to survey response via sidebar
    When user selects filters and downloads surveys
      | year | camp            | week      |
      | 2025 | Towers          | Week 2    |
      | 2025 | Crier Creek     | Week 3    |
      | 2025 | City-Alpine     | Week 5    |
      | 2025 | Shores          | Week 7    |
    When user selects filter and view survey details
      | year | camp            | week      | surveyType |
      | 2025 | Towers          | Week 2    | Campers    |
      | 2025 | Crier Creek     | Week 3    | Families   |
      | 2025 | City-Alpine     | Week 5    | Campers    |
      | 2025 | Shores          | Week 7    | Staff      |