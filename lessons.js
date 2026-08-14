const LESSONS = [
  {
    id: "brief",
    bg: "assets/bgs/bg-plaza.png",
    kicker: "QUEST BOARD",
    title: "Your 3 mission goals",
    flavor: "The mayor of old Daet pinned these on the plaza board.",
    body: `
      <div class="say show">
        <span class="who">TOWN CRIER</span>
        <p>Finish this quest and you’ll be able to do all three. No skipping the why!</p>
      </div>
      <div class="cards auto">
        <article class="card show">
          <span class="card-gem">1</span>
          <strong>Compute the loot</strong>
          <p>Solve real earnings from <em>commission</em> and <em>piecework (pakyaw)</em>.</p>
        </article>
        <article class="card show">
          <span class="card-gem">2</span>
          <strong>Compare pay paths</strong>
          <p>See how salary+commission, straight commission, and pakyaw pay differently.</p>
        </article>
        <article class="card show">
          <span class="card-gem">3</span>
          <strong>Spot the catch</strong>
          <p>Name the advantage and the limit of each earning system.</p>
        </article>
      </div>
    `,
  },
  {
    id: "lore",
    bg: "assets/bgs/bg-palengke.png",
    kicker: "MARKET LORE",
    title: "Two ways people get paid",
    flavor: "Same town, two very different loot rules.",
    body: `
      <div class="cards two auto">
        <article class="card show">
          <span class="tag">COMMISSION</span>
          <strong>The closer</strong>
          <p>A <strong>percentage of total sales</strong> paid as a reward for securing business.</p>
          <p class="why">Why: more sales → more pay. The shop shares the win.</p>
          <p>Two modes: <em>straight commission</em> (commission only) or <em>salary plus commission</em> (base pay + extra from sales).</p>
          <p class="limit">Catch: slow sales mean smaller take-home. Straight commission is riskier.</p>
        </article>
        <article class="card show">
          <span class="tag gold">PAKYAW</span>
          <strong>The maker</strong>
          <p>Piecework: a <strong>fixed rate per finished unit</strong>, no matter how long it takes.</p>
          <p class="why">Why: pay follows output, not the clock. More pieces → more coins.</p>
          <p class="limit">Catch: rushing can hurt quality. Slow work still pays the same per piece.</p>
        </article>
      </div>
    `,
  },
  {
    id: "formulas",
    bg: "assets/bgs/bg-school.png",
    kicker: "SPELLBOOK",
    title: "The two pay formulas",
    flavor: "Memorize these. Every later quest uses them.",
    body: `
      <div class="cards two auto">
        <article class="card show formula">
          <span class="tag">COMMISSION</span>
          <p class="eq">Units Sold × Commission Rate</p>
          <p class="why">Why: the rate is a slice of each sale (3% means 0.03 × the price). Multiply, don’t add the % as a whole number.</p>
        </article>
        <article class="card show formula">
          <span class="tag gold">PIECEWORK</span>
          <p class="eq">Quantity Produced × Rate Per Unit</p>
          <p class="why">Why: every finished unit is worth the same coin. Count the pieces, then multiply by the rate.</p>
        </article>
      </div>
    `,
  },
  {
    id: "liza",
    bg: "assets/bgs/bg-shop.png",
    kicker: "APPLIANCE QUEST",
    title: "Ate Liza’s Friday",
    flavor: "Salary plus commission — both parts count.",
    body: `
      <div class="say show">
        <span class="who">ATE LIZA</span>
        <p>I’m a sales clerk. Daily wage <strong>₱500</strong>, plus <strong>3%</strong> of any appliance I sell. Friday I sold a smart fridge for <strong>₱45,000</strong>. What did I take home that day?</p>
      </div>
      <div class="answer-banner show">ANSWER · ₱1,850</div>
      <div class="explain show">
        <p class="why-title">Why ₱1,850 — not ₱1,350 and not ₱45,000</p>
        <ol>
          <li><strong>Commission first.</strong> 3% of the fridge = ₱45,000 × 0.03 = <strong>₱1,350</strong>. That’s only the bonus for the sale.</li>
          <li><strong>She still has a daily wage.</strong> The ₱500 is paid even without a sale, so you must add it.</li>
          <li><strong>Total Friday earnings</strong> = ₱500 + ₱1,350 = <strong>₱1,850</strong>. This is salary-plus-commission: base + percent of sales.</li>
        </ol>
      </div>
    `,
  },
  {
    id: "totoy",
    bg: "assets/bgs/bg-garment.png",
    kicker: "PAKYAW QUEST",
    title: "Mang Totoy’s two days",
    flavor: "Garment factory, pakpawan style — no daily wage.",
    body: `
      <div class="say show">
        <span class="who">MANG TOTOY</span>
        <p>I sew in a garment factory. No daily wage. I get <strong>₱15 per finished t-shirt</strong>. Monday: <strong>45</strong> shirts. Tuesday: <strong>52</strong> shirts. What did I earn in two days?</p>
      </div>
      <div class="answer-banner show">ANSWER · ₱1,455</div>
      <div class="explain show">
        <p class="why-title">Why ₱1,455 — not ₱675 and not ₱15 × 2</p>
        <ol>
          <li><strong>Monday only:</strong> 45 × ₱15 = <strong>₱675</strong>. That’s one day, not the whole quest.</li>
          <li><strong>Tuesday:</strong> 52 × ₱15 = <strong>₱780</strong>. More shirts, more pay — time doesn’t matter.</li>
          <li><strong>Add both days:</strong> ₱675 + ₱780 = <strong>₱1,455</strong>. Piecework pays per unit, so you total the pieces across days, then the pesos.</li>
        </ol>
      </div>
    `,
  },
  {
    id: "allow",
    bg: "assets/bgs/bg-jeep.png",
    kicker: "SUPPLY CHEST",
    title: "What is an allowance?",
    flavor: "This money is for the job’s costs — not extra “bonus salary.”",
    body: `
      <div class="say show">
        <span class="who">PAYMASTER</span>
        <p>Allowances are <strong>extra monetary benefits</strong> so workers can cover job-related expenses. They are often <strong>non-taxable up to a limit</strong> (de minimis benefits).</p>
      </div>
      <div class="cards three auto">
        <article class="card show">
          <span class="tag">TRANSPO</span>
          <strong>Ride pouch</strong>
          <p>Transportation allowance — jeep, tricycle, or gas to get to work.</p>
        </article>
        <article class="card show">
          <span class="tag gold">MEALS</span>
          <strong>Baon pouch</strong>
          <p>Food / meal allowance while on duty.</p>
        </article>
        <article class="card show">
          <span class="tag">GEAR</span>
          <strong>Clothes pouch</strong>
          <p>Clothing or uniform help for the job.</p>
        </article>
      </div>
      <p class="why show">Why it matters: don’t mix this with wage. Wage is pay for work. Allowance is earmarked for costs, so the worker isn’t spending salary just to do the job.</p>
    `,
  },
  {
    id: "ramon",
    bg: "assets/bgs/bg-rider.png",
    kicker: "RIDER ROUTE",
    title: "Mang Ramon’s week",
    flavor: "Base pay and allowance are different pockets.",
    body: `
      <div class="say show">
        <span class="who">MANG RAMON</span>
        <p>I’m a delivery rider. Base <strong>₱400/day</strong> plus <strong>₱150/day</strong> gasoline and maintenance allowance. I work <strong>6 days</strong>. What’s my total cash from the platform, and how much of it is allowance?</p>
      </div>
      <div class="answer-banner show">ANSWER · ₱3,300 total · ₱900 is allowance</div>
      <div class="explain show">
        <p class="why-title">Why ₱3,300 — and why only ₱900 is allowance</p>
        <ol>
          <li><strong>Base pay</strong> is for the work itself: 6 × ₱400 = <strong>₱2,400</strong>.</li>
          <li><strong>Allowance</strong> is for gas and maintenance, not salary: 6 × ₱150 = <strong>₱900</strong>.</li>
          <li><strong>Cash he actually receives</strong> = ₱2,400 + ₱900 = <strong>₱3,300</strong>. The ₱900 is strictly for operating costs — he shouldn’t treat it as extra spending money.</li>
        </ol>
      </div>
    `,
  },
];
