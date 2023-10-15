import { Commit } from "../types/api.ts";


function getColorClass(index: number, commitsLength: number): string {
  if (index === 0) {
    return "step-primary";
  }

  if (index === commitsLength - 1) {
    return "step-success";
  }

  return "";
}

type CommitsListProps = {
  commits: Commit[];
};
function CommitsList({ commits }: CommitsListProps) {
  return (
    <ul className="steps steps-vertical">
      {commits.map((commit, index) => (
        <li
          key={index}
          className={`step ${getColorClass(index, commits.length)}`}
          data-content={commits.length - index}
        >
          <p className="text-left m-2">
            <div>
              <div className="avatar placeholder me-2">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span className="text-xs uppercase">
                    {commit.author_name[0] ?? "?"}
                  </span>
                </div>
              </div>
              <span className="ms-2">{commit.author_name}</span>
              {commit.author_name !== commit.committer_name &&
                (
                  <>
                    <br />
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                        <span className="text-xs uppercase">
                          {commit.committer_name[0] ?? "?"}
                        </span>
                      </div>
                    </div>
                    <span className="ms-2">{commit.committer_name}</span>
                  </>
                )}
            </div>
            <br />
            <span>{commit.message.trim()}</span>
            <div className="divider"></div>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default CommitsList;
