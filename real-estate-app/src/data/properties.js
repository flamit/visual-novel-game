export const PROPERTIES = [
  {
    id: 'p1',
    title: 'Modern 2BR Apartment',
    price: 325000,
    address: '123 Market St, San Francisco, CA',
    beds: 2,
    baths: 2,
    sqft: 980,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'p2',
    title: 'Cozy Craftsman House',
    price: 575000,
    address: '88 Pine Ave, Portland, OR',
    beds: 3,
    baths: 2,
    sqft: 1450,
    image: 'https://images.unsplash.com/photo-1613977256392-9f1b1e57f7dc?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'p3',
    title: 'Downtown Loft',
    price: 450000,
    address: '700 Main St, Austin, TX',
    beds: 1,
    baths: 1,
    sqft: 720,
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'p4',
    title: 'Suburban Family Home',
    price: 695000,
    address: '45 Maple Dr, Denver, CO',
    beds: 4,
    baths: 3,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop'
  }
];

export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}