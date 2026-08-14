window.QUESTIONS = [
  {
    id: 1,
    part: 1,
    title: "Basic Daily Wage Equation",
    story:
      "A sales assistant in Camarines Norte earns ₱480 per day. If she works 𝑑 regular days in a month, her total gross monthly wage 𝑊 is expressed by:",
    formula: "𝑊 = 480𝑑",
    ask: "What is her gross wage if she works 𝑑 = 22 days in a month?",
    choices: ["₱9,600", "₱10,560", "₱11,040", "₱11,520"],
    answer: 1,
    explain: "𝑊 = 480(22) = ₱10,560. Multiply the daily wage by the number of days — do not add 480 and 22.",
  },
  {
    id: 2,
    part: 1,
    title: "Annual to Monthly Salary Equation",
    story:
      "An office clerk receives a fixed annual salary 𝐴 of ₱420,000. The relationship between annual salary and monthly salary 𝑀 is:",
    formula: "𝐴 = 12𝑀",
    ask: "What is the clerk's gross monthly salary?",
    choices: ["₱30,000", "₱32,500", "₱35,000", "₱37,500"],
    answer: 2,
    explain: "420,000 = 12𝑀, so 𝑀 = 420,000 ÷ 12 = ₱35,000. Divide the annual salary by 12 months.",
  },
  {
    id: 3,
    part: 1,
    title: "Piece-Rate Earnings Equation",
    story:
      "A handicraft worker is paid ₱18 for every completed product. His total daily wage 𝑊 based on the number of completed units 𝑛 is:",
    formula: "𝑊 = 18𝑛",
    ask: "How much does he earn if he completes 𝑛 = 35 units?",
    choices: ["₱540", "₱600", "₱630", "₱720"],
    answer: 2,
    explain: "𝑊 = 18(35) = ₱630. Piece-rate: rate per unit times number of finished units.",
  },
  {
    id: 4,
    part: 1,
    title: "Overtime Hourly Rate Equation",
    story:
      "An employee's regular hourly rate is 𝑟. Overtime work on a regular workday is paid at 125% of the regular hourly rate.",
    formula: null,
    ask: "Which equation correctly represents the overtime hourly rate ROT?",
    choices: ["𝑅𝑂𝑇 = 0.25𝑟", "𝑅𝑂𝑇 = 1.00𝑟", "𝑅𝑂𝑇 = 1.25𝑟", "𝑅𝑂𝑇 = 1.50𝑟"],
    answer: 2,
    explain:
      "Regular pay is 100% and the overtime premium is 25%, so 100% + 25% = 125% = 1.25. Therefore 𝑅𝑂𝑇 = 1.25𝑟, not 0.25𝑟 (that would be the premium only).",
  },
  {
    id: 5,
    part: 1,
    title: "Overtime Hours Equation",
    story:
      "An employee works a total of 𝐻 hours on a regular workday. Overtime hours ℎOT are the hours worked beyond 8 hours.",
    formula: null,
    ask: "Which equation correctly determines the overtime hours when 𝐻 > 8?",
    choices: ["ℎ𝑂𝑇 = 𝐻 + 8", "ℎ𝑂𝑇 = 8 − 𝐻", "ℎ𝑂𝑇 = 𝐻 − 8", "ℎ𝑂𝑇 = 8𝐻"],
    answer: 2,
    explain: "Subtract the regular 8 hours from total hours: ℎ𝑂𝑇 = 𝐻 − 8.",
  },
  {
    id: 6,
    part: 2,
    title: "Daily Earnings with Overtime Pay",
    story:
      "A technician earns a regular hourly rate of ₱90 per hour. On Tuesday, he works 8 regular hours and 2 overtime hours. Overtime is paid at 1.25𝑟. His total daily gross pay 𝑃 is modeled by:",
    formula: "𝑃 = 8𝑟 + 2(1.25𝑟)",
    ask: "Calculate his total gross earnings for the day.",
    choices: ["₱810", "₱900", "₱945", "₱1,035"],
    answer: 2,
    explain:
      "Regular pay: 8(90) = ₱720. Overtime rate: 1.25(90) = ₱112.50. Overtime pay: 2(112.50) = ₱225. Total: 720 + 225 = ₱945.",
  },
  {
    id: 7,
    part: 2,
    title: "Multi-Day Piecework Earnings",
    story:
      "A garment worker receives ₱14 per stitched unit. She stitches 40 units on Day 1 and 50 units on Day 2. Her total two-day gross wage is:",
    formula: "𝑊total = 𝑝(𝑛₁ + 𝑛₂)",
    ask: "Find 𝑊total.",
    choices: ["₱1,120", "₱1,260", "₱1,400", "₱1,540"],
    answer: 1,
    explain: "𝑊total = 14(40 + 50) = 14(90) = ₱1,260. Add the units first, then multiply by the piece rate.",
  },
  {
    id: 8,
    part: 2,
    title: "Monthly Net Pay Equation",
    story:
      "An employee's gross monthly salary is ₱32,000. Her total deductions consist of: SSS: ₱1,400; PhilHealth: ₱1,350; Pag-IBIG: ₱200; Tardiness penalty: ₱250. Net pay 𝑁 is given by:",
    formula: "𝑁 = 𝐺 − 𝐷",
    ask: "What is her exact net pay?",
    choices: ["₱28,550", "₱28,800", "₱29,000", "₱29,200"],
    answer: 1,
    explain:
      "𝐷 = 1,400 + 1,350 + 200 + 250 = ₱3,200. 𝑁 = 32,000 − 3,200 = ₱28,800.",
  },
  {
    id: 9,
    part: 2,
    title: "Daily Net Take-Home Pay with Overtime",
    story:
      "An employee receives a basic daily wage of ₱640 for an 8-hour shift. Her regular hourly rate is:",
    formula: "𝑟 = 640 / 8",
    extra:
      "On Friday, she works 12 total hours, including 4 overtime hours paid at 1.25𝑟. Her employer deducts a ₱120 cash advance repayment. Use the equation:",
    formula2: "𝑁 = 640 + 4(1.24𝑟) − 120",
    ask: "What is her final daily net take-home pay?",
    choices: ["₱900", "₱920", "₱920", "₱960"],
    answer: [1, 2],
    explain:
      "𝑟 = 640 ÷ 8 = ₱80. Overtime rate 1.25(80) = ₱100. Overtime pay 4(100) = ₱400. Gross 640 + 400 = ₱1,040. Net 1,040 − 120 = ₱920.",
  },
  {
    id: 10,
    part: 2,
    title: "Algebraic Reverse Engineering of Hourly Rate",
    story:
      "A field technician earns a total gross pay of ₱1,410 for working 11 hours on a regular workday. He works 8 regular hours and 3 overtime hours at 1.25𝑟. Set up the equation:",
    formula: "8𝑟 + 3(1.25𝑟) = 1410",
    ask: "Solve for the technician's regular hourly rate 𝑟.",
    choices: ["₱110/hour", "₱115/hour", "₱120/hour", "₱125/hour"],
    answer: 2,
    explain:
      "8𝑟 + 3.75𝑟 = 1410 → 11.75𝑟 = 1410 → 𝑟 = 1410 ÷ 11.75 = ₱120/hour.",
  },
];
