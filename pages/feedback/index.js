import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {
  console.log(props);
  return (
    <ul>
      {props.feedbackItems.map((item) => {
        return <li key={item.id}>{item.text}</li>;
      })}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
