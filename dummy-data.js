import useSWR from 'swr';

export async function getAllEvents() {
  const res = await fetch(
    'https://nextjs-course-b8418-default-rtdb.firebaseio.com/events.json'
  );
  const data = await res.json();
  return transformEvents(data);
}

function transformEvents(events) {
  const transformedEvents = [];
  for (const key in events) {
    transformedEvents.push({
      id: key,
      ...events[key],
    });
  }
  return transformedEvents;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const events = await getAllEvents();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
}
