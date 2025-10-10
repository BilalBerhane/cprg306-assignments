

import Link from "next/link";

export default function StudentInfo() {
  return (
    <div>
      <h1>Student Information</h1>
      <p>Name: Bilal</p>
      <p>
        GitHub:{" "}
        <Link href="https://github.com/BilalBerhane" target="_blank">
          github.com/BilalBerhane
        </Link>
      </p>
    </div>
  );
}
