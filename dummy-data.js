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
      title: events[key].title,
      description: events[key].description,
      location: events[key].location,
      date: events[key].date,
      image: events[key].image,
      isFeatured: events[key].isFeatured,
    });
  }
  return transformedEvents;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export function getFilteredEvents(dateFilter) {
  const { data, error } = useSWR(
    'https://nextjs-course-b8418-default-rtdb.firebaseio.com/events.json'
  );
  const { year, month } = dateFilter;
  const events = transformEvents(data);
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
