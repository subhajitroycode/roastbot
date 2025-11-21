const downloadRoastCard = async (roast: string): Promise<void> => {
  const url = `/api/og?text=${encodeURIComponent(roast)}`;
  const blob = await fetch(url).then((res) => res.blob());
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "roast-card.png";
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
};

export default downloadRoastCard;
