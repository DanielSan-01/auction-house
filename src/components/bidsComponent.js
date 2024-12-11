export function BidsComponent(bids) {
  const bidsContainer = document.createElement('div');
  bidsContainer.className = 'bids-container';

  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold mb-4';
  title.textContent = 'Bids';

  const bidsList = document.createElement('ul');
  bidsList.className = 'bids-list space-y-2';

  if (!bids || bids.length === 0) {
    const noBids = document.createElement('p');
    noBids.className = 'text-gray-500';
    noBids.textContent = 'No bids have been placed on this listing.';
    bidsContainer.append(title, noBids);
    return bidsContainer;
  }

  bids
    .sort((a, b) => b.amount - a.amount)
    .forEach((bid) => {
      const bidItem = document.createElement('li');
      bidItem.className = 'bid-item p-4 bg-gray-100 rounded shadow';

      const bidder = document.createElement('p');
      bidder.className = 'text-sm text-gray-700';
      bidder.textContent = `Bidder: ${bid.bidder?.name || 'Anonymous'}`;

      const amount = document.createElement('p');
      amount.className = 'text-lg font-bold text-blue-500';
      amount.textContent = `Amount: ${bid.amount}`;

      const created = document.createElement('p');
      created.className = 'text-sm text-gray-500';
      created.textContent = `Placed: ${Math.floor(
        (Date.now() - new Date(bid.created)) / (1000 * 60 * 60 * 24)
      )} days ago`;

      bidItem.append(bidder, amount, created);
      bidsList.appendChild(bidItem);
    });

  bidsContainer.append(title, bidsList);
  return bidsContainer;
}
