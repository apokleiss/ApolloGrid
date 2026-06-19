document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking links on mobile
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  // 2. Solar Calculator Logic
  const calculator = document.getElementById('solarCalculator');
  const resultBox = document.getElementById('resultBox');

  calculator.addEventListener('submit', (e) => {
    e.preventDefault();

    const monthlyKwh = parseFloat(document.getElementById('monthlyKwh').value);
    const electricityPrice = parseFloat(document.getElementById('electricityPrice').value);
    const roofArea = parseFloat(document.getElementById('roofArea').value);

    // Baseline rough engineering assumptions for solar yield (e.g., ~1500 kWh/kWp per year)
    const annualGenerationPerKwp = 1500; 
    const panelAreaPerKwp = 6; // Requires ~6 square meters per kWp

    const annualDemand = monthlyKwh * 12;
    let targetSystemSize = annualDemand / annualGenerationPerKwp;
    const maxSystemSizeByRoof = roofArea / panelAreaPerKwp;

    // Cap the system sizing dynamically based on physical constraints
    if (targetSystemSize > maxSystemSizeByRoof) {
      targetSystemSize = maxSystemSizeByRoof;
    }

    const estimatedAnnualSavings = targetSystemSize * annualGenerationPerKwp * electricityPrice;
    const estimatedMonthlySavings = estimatedAnnualSavings / 12;

    resultBox.innerHTML = `
      <h3 style="margin-bottom: 8px; color: #0f172a;">Your Preliminary Estimate</h3>
      <p style="margin-bottom: 4px;">Suggested Solar Array: <strong>${targetSystemSize.toFixed(1)} kWp</strong></p>
      <p>Estimated Savings: <strong>€${estimatedMonthlySavings.toFixed(0)} / month</strong></p>
      <p style="font-size: 0.8rem; color: #64748b; margin-top: 8px;">*Assumes typical regional irradiance levels and optimized self-consumption profiles.</p>
    `;
    resultBox.removeAttribute('hidden');
  });

  // 3. Simple Lead Form handling (Intercept submit action)
  const leadForm = document.getElementById('leadForm');
  const formStatus = document.getElementById('formStatus');

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.innerText = "Thank you! Processing your technical parameters...";
    formStatus.style.color = "#10b981";
    
    // Reset form after a small delay simulation
    setTimeout(() => {
      leadForm.reset();
      formStatus.innerText = "Request submitted successfully. An engineer will follow up shortly.";
    }, 1000);
  });
});