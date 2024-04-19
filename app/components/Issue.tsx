

type IssueType = {
  id: number;
  title: string;
  description: string;
};

const Issue = ({ issue }: { issue: IssueType }) => { // Specify the type for issue prop

  return (
    <div className="issue">
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default Issue;
