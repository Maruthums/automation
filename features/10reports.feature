Feature: Reports download validation

  @reports
  Scenario: Download reports for multiple Year, Camp and Week combinations
    Given user is logged in and on the Reports page
    When user selects filters and downloads reports
      | year | camp            | week      | report              |
      | 2025 | Towers          | Week 9    | Camper Survey Data  |
      | 2025 | Woods           | Week 6    | Family Survey Data  |
      | 2025 | City-Alpine     | Week 5    | Camper Survey Data  |
      | 2025 | Shores Overflow | Session B | Camper Survey Data  |
