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
  'Still figuring it out'
];

export const ETHNICITY_OPTIONS = [
  'Asian',
  'Black/African',
  'Hispanic/Latino',
  'Middle Eastern',
  'Native American'
];

export const FAMILY_PLANS_OPTIONS = [
  "Don't want kids",
  'Wants kids someday',
  'Have kids already',
  'Open to kids',
  'Not decided yet'
];

export const DRINKING_OPTIONS = [
  'Never',
  'Rarely',
  'Sometimes',
  'Often'
];

export const SMOKING_OPTIONS = [
  'Never',
  'Rarely',
  'Sometimes',
  'Often'
];

export const RELIGION_OPTIONS = [
  'Christianity',
  'Islam',
  'Judaism',
  'Hinduism',
  'Buddhism',
  'Agnostic',
  'Atheist',
  'Spiritual, but not religious',
  'Other',
  'Prefer not to say'
];

export const POLITICS_OPTIONS = [
  'Liberal',
  'Conservative',
  'Moderate',
  'Progressive',
  'Libertarian',
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
  'Family-oriented',
  'Career-Focused',
  'Creativity',
  'Adventure & Travel',
  'Authenticity',
  'Ambition',
  'Kindness & Empathy',
  'Sense of Humor',
  'Health & Fitness',
  'Continuous Learning'
];

