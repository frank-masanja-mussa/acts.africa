# Google Sheets Structure for ACTS Africa

## Sheet 1: "Impact Metrics" (Main Dashboard Data)
| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| timestamp | studentsReached | schoolsParticipating | teachersTrained | communityShowcases | workforcePlacements | fundingRaised | chaptersActive | lastUpdated |
| 2024-01-15T10:00:00Z | 8500 | 42 | 350 | 18 | 85 | 175000 | 3 | 2024-01-15T10:00:00Z |
| 2024-01-16T10:00:00Z | 8750 | 43 | 365 | 19 | 90 | 180000 | 3 | 2024-01-16T10:00:00Z |

## Sheet 2: "Survey Responses" (AI Literacy Survey Data)
| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I | Column J |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| timestamp | country | region | ageGroup | gender | educationLevel | aiKnowledge | internetAccess | learningBarriers | willingToJoin |
| 2024-01-15T10:00:00Z | Tanzania | Dar es Salaam | 18-25 | Female | Secondary | Beginner | Mobile | Cost | Yes |
| 2024-01-15T10:05:00Z | Tanzania | Arusha | 26-35 | Male | University | Intermediate | WiFi | Time | Yes |

## Sheet 3: "Student Data" (Individual Student Records)
| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H |
|----------|----------|----------|----------|----------|----------|----------|----------|
| studentId | name | school | grade | aiLiteracyScore | region | enrollmentDate | status |
| ST001 | John Doe | Katavi Secondary | 12 | 85 | Katavi | 2024-01-15 | Active |
| ST002 | Jane Smith | Arusha High | 11 | 92 | Arusha | 2024-01-16 | Active |

## Sheet 4: "School Data" (School Information)
| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| schoolId | schoolName | region | studentsCount | teachersCount | partnershipDate | status |
| SC001 | Katavi Secondary | Katavi | 500 | 25 | 2024-01-01 | Active |
| SC002 | Arusha High | Arusha | 750 | 40 | 2024-01-05 | Active |

## Sheet 5: "Funding Data" (Financial Records)
| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| date | source | amount | purpose | status | notes |
| 2024-01-15 | Donation | 50000 | Teacher Training | Received | Anonymous donor |
| 2024-01-20 | Grant | 100000 | Equipment | Pending | Government grant |

## Sheet 6: "Chapter Data" (Chapter Information)
| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| chapterId | chapterName | region | establishedDate | membersCount | status |
| CH001 | Dar es Salaam Chapter | Dar es Salaam | 2024-01-01 | 25 | Active |
| CH002 | Arusha Chapter | Arusha | 2024-01-15 | 18 | Active |

## Sheet 7: "Analytics Summary" (Aggregated Data)
| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| metric | currentValue | previousValue | change | lastUpdated |
| Total Students | 8500 | 8000 | +6.25% | 2024-01-15T10:00:00Z |
| Active Schools | 42 | 40 | +5% | 2024-01-15T10:00:00Z |
| Survey Responses | 1250 | 1000 | +25% | 2024-01-15T10:00:00Z |
