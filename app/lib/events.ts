export async function fetchEvents() {
  try {
    const response = await fetch('https://api.predicthq.com/v1/events/', {
      headers: {
        Authorization: 'Bearer H428WwrA754f-mazLxuRXdDbD-vzd4dNphpl-tYW',
        Accept: 'application/json',
      },
    });

    const events = await response.json();

    console.log(events);
    return events;
  } catch (error) {
    console.error('Error fetching:', error);
    throw new Error('Failed to fetch quests');
  }
}
interface ParamsItems {
  q?: string;
}

export async function searchEvents(item: string): Promise<any> {
  try {
    const paramsObj: ParamsItems | any = {};

    if (item) {
      paramsObj.q = item;
    }

    const response = await fetch(
      `https://api.predicthq.com/v1/events/?${new URLSearchParams(
        paramsObj
      ).toString()}`,
      {
        headers: {
          Authorization: 'Bearer H428WwrA754f-mazLxuRXdDbD-vzd4dNphpl-tYW',
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const events = await response.json();

    console.log(events);
    return events;
  } catch (error) {
    console.error('Error fetching:', error);
    throw new Error('Failed to fetch events');
  }
}
