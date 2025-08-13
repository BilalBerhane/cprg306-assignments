export default function StudentInfo() {
  const name = "Bilal Berhane";
  const repoUrl = "https://github.com/BilalBerhane/cprg306-assignments.git"; 

  return (
    <div>
      <h2>Student Info:</h2>
      <p>Name: {name}</p>
      <p>
        GitHub:{" "}
        <a href={repoUrl} target="_blank" rel="noopener noreferrer">
          {repoUrl}
        </a>
      </p>
    </div>
  );
}
