import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

function HomePage(props) {
  const featuredEvents = props.featuredEvents;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  return {
    props: {
      featuredEvents: await getFeaturedEvents(),
    },
  };
}
