// ------------------------------------
// Poll
// ------------------------------------
export interface PollOptionFormValue {
  text: string;
}

export interface PollFormValue {
  question: string;
  options: PollOptionFormValue[];
}

// ------------------------------------
// Feeling
// ------------------------------------
export interface FeelingFormValue {
  id: string;
  label: string;
  emoji: string;
}

// ------------------------------------
// (Optional) Location – ready for future
// ------------------------------------
export interface LocationFormValue {
  placeId: string;
  name: string;
}

// ------------------------------------
// Create Post Form
// ------------------------------------
export interface CreatePostFormValues {
  audience: string;
  content?: string;
  poll?: PollFormValue;
  image?: string;
  feeling?: FeelingFormValue;
  location?: LocationFormValue;
}
