const calculateNPS = (rollingPromoters, rollingDetractors, rollingPassives) => {
  // remove all unneeded entries:
  // let monthsToRemove = monthEnd - monthStart;
  // monthsToRemove = Math.abs(monthsToRemove);
  // console.log("Months to remove: ", monthsToRemove);
  // rollingPromoters.splice(0, monthsToRemove);
  // rollingDetractors.splice(0, monthsToRemove);
  // rollingPassives.splice(0, monthsToRemove);
  console.log("Rolling Promoters: ", rollingPromoters);
  console.log("Rolling Detractors: ", rollingDetractors);
  console.log("Rolling Passives: ", rollingPassives);
  const currentNPS =
    ((rollingPromoters[rollingPromoters.length - 1] -
      rollingDetractors[rollingDetractors.length - 1]) /
      (rollingPromoters[rollingPromoters.length - 1] +
        rollingDetractors[rollingDetractors.length - 1] +
        rollingPassives[rollingPassives.length - 1])) *
    100;

  const lastMonthNPS =
    ((rollingPromoters[rollingPromoters.length - 2] -
      rollingDetractors[rollingDetractors.length - 2]) /
      (rollingPromoters[rollingPromoters.length - 2] +
        rollingDetractors[rollingDetractors.length - 2] +
        rollingPassives[rollingPassives.length - 2])) *
    100;

  console.log("Current NPS: ", currentNPS);
  console.log("lastMonthNPS: ", lastMonthNPS);

  let IntcurrentNPS = Math.round(currentNPS);
  let IntLastmonthNPS = Math.round(lastMonthNPS);

  if (isNaN(IntLastmonthNPS)) {
    IntLastmonthNPS = "No Data";
  }
  if (isNaN(IntcurrentNPS)) {
    IntcurrentNPS = "No Data";
  }

  const NPSScores = {
    currentNPS: IntcurrentNPS,
    lastMonthNPS: IntLastmonthNPS,
  };
  return NPSScores;
};