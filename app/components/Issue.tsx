type IssueType = {
  id: number;
  title: string;
  description: string;
};

const Issue = ({ issue, index }: { issue: IssueType; index: number }) => {
  // Specify the type for issue prop

  return (
    <div className=" flex items-start m-4 p-4 rounded-md border border-zinc-900 shadow-lg mb-5 bg-zinc-100">
      <h2 className=" m-4 p-2 flex-shrink-0 text-2xl font-medium justify-center items-center">
        {index + 1}
      </h2>
      <div className=" flex flex-col p-3">
        <h3 className=" flex-grow text-2xl font-medium mb-2">{issue.title}</h3>
        <p className=" text-md mb-2">{issue.description}</p>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default Issue;
