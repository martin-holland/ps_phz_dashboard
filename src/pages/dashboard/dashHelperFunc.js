export const getNewResults = (results) => {
  let start = new Date(document.getElementById("start").value).toISOString();
  let end = new Date(document.getElementById("end").value);
  end.setDate(end.getDate() + 1);
  end = end.toISOString();
  let newResults = results.filter(
    (date) => date.createdAt >= start && date.createdAt <= end
  );
  return newResults;
};
export const getSixMonthAgoISoString = () => {
  let sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo = sixMonthsAgo.toISOString().split("T")[0];
  return sixMonthsAgo;
};
