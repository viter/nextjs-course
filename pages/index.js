import Head from 'next/head';

import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

function HomePage(props) {
  const featuredEvents = props.featuredEvents;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
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
    revalidate: 1800,
  };
}
