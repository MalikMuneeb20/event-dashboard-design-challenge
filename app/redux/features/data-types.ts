interface EventState {
  title: string;
  id: string;
  rank: number;
  start: string;
  country: string;
  category: string;
  description: string;
  favourite: boolean;
}

interface InitialState {
  count: number;
  value: EventState[];
}

interface InitialUpcomingState {
  count: number;
  value: EventState[];
  eventOfMonth: EventState;
}

interface LoadingState {
  loading: boolean;
}

export type { LoadingState, InitialState, EventState, InitialUpcomingState };
