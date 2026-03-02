export const SERVICE_TYPES = [
  'Office Cleaning',
  'IT Support',
  'Catering',
  'Security',
  'Reception Services',
];

export const INITIAL_TASKS = [
  { id: 1, text: 'Send offer to client for review', done: false },
  { id: 2, text: 'Schedule follow-up meeting', done: false },
  { id: 3, text: 'Prepare service agreement draft', done: false },
];

export const AI_SUGGESTIONS = {
  'Office Cleaning':
    'Consider bundling weekly cleaning with a monthly deep-clean at 15% off - clients love predictable pricing.',
  'IT Support': 'Offering a 24/7 emergency hotline add-on increases deal close rates by 30%.',
  Catering: 'Seasonal menu rotations keep clients engaged - suggest a quarterly refresh option.',
  Security:
    'Pair on-site guards with remote CCTV monitoring for a premium yet cost-effective package.',
  'Reception Services':
    'Bilingual reception staff can justify a 20% premium in multinational office buildings.',
};
