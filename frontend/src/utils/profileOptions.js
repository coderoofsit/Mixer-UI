// Profile form dropdown and multi-select options
// Matches mobile app (event_dating-IAP_FIX_V1) field options

// Generate height options from 4'0" to 7'0"
export const HEIGHT_OPTIONS = [];
for (let ft = 4; ft <= 7; ft++) {
  for (let inch = 0; inch < 12; inch++) {
    HEIGHT_OPTIONS.push(`${ft}'${inch}"`);
  }
}

export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Other Gender'
];

export const INTERESTED_IN_OPTIONS = [
  'Male',
  'Female',
  'Non-binary',
  'Everyone'
];

export const SEXUALITY_OPTIONS = [
  'Straight',
  'Gay',
  'Lesbian',
  'Bisexual',
  'Pansexual',
  'Asexual',
  'Queer',
  'Questioning',
  'Other'
];

export const RELATIONSHIP_OPTIONS = [
  'Looking for a long-term partner',
  'Just here for fun',
  'still figuring it out'
];

export const ETHNICITY_OPTIONS = [
  'Asian',
  'Black/African Descent',
  'Hispanic/Latino',
  'White/Caucasian',
  'Middle Eastern',
  'Native American',
  'Pacific Islander',
  'Mixed/Multiple',
  'Other',
  'Prefer not to say'
];

export const FAMILY_PLANS_OPTIONS = [
  'Want children',
  "Don't want children",
  'Have children',
  'Open to children',
  'Not sure yet'
];

export const DRINKING_OPTIONS = [
  'Never',
  'Socially',
  'Regularly',
  'Prefer not to say'
];

export const SMOKING_OPTIONS = [
  'Never',
  'Socially',
  'Regularly',
  'Trying to quit',
  'Prefer not to say'
];

export const RELIGION_OPTIONS = [
  'Agnostic',
  'Atheist',
  'Buddhist',
  'Catholic',
  'Christian',
  'Hindu',
  'Jewish',
  'Muslim',
  'Spiritual',
  'Other',
  'Prefer not to say'
];

export const POLITICS_OPTIONS = [
  'Liberal',
  'Moderate',
  'Conservative',
  'Not Political',
  'Prefer not to say'
];

export const INTERESTS_OPTIONS = [
  'Travel',
  'Music',
  'Movies',
  'Sports',
  'Fitness',
  'Yoga',
  'Hiking',
  'Photography',
  'Art',
  'Cooking',
  'Gaming',
  'Reading',
  'Writing',
  'Dancing',
  'Fashion',
  'Food',
  'Wine',
  'Coffee',
  'Pets',
  'Volunteering',
  'Technology',
  'Business',
  'Entrepreneurship',
  'Politics',
  'Environment',
  'Meditation',
  'Theater',
  'Concerts',
  'Museums',
  'Beach',
  'Mountains',
  'Camping',
  'Running',
  'Cycling',
  'Swimming',
  'Tennis',
  'Basketball',
  'Soccer',
  'Baseball',
  'Football',
  'Golf'
];

export const VALUES_OPTIONS = [
  'Honesty',
  'Loyalty',
  'Respect',
  'Communication',
  'Trust',
  'Kindness',
  'Humor',
  'Adventure',
  'Ambition',
  'Family',
  'Career',
  'Health',
  'Spirituality',
  'Creativity',
  'Intelligence',
  'Compassion',
  'Independence',
  'Stability',
  'Fun',
  'Growth',
  'Open-mindedness',
  'Authenticity',
  'Passion',
  'Balance',
  'Courage',
  'Patience',
  'Generosity',
  'Mindfulness',
  'Responsibility',
  'Optimism'
];

