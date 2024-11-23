import { format } from "date-fns";
type Application = {
  id: string;
  slug: string;
  success: boolean;
  error: string | null;
  screenshot: string | null;
  createdAt: string;
};

export async function Applications({ offerId }: { offerId: string }) {
  const applications = (await fetch(
    "http://localhost:4000/applications/" + offerId
  ).then((res) => res.json())) as Application[];
  console.log("applications", applications);

  return (
    <div>
      <h2>Applications</h2>
      {applications.map((application) => (
        <div key={application.id} style={{ display: "flex", gap: "1rem" }}>
          <p>Success: {application.success}</p>
          <p>Error: {application.error}</p>
          <p>Screenshot: {application.screenshot}</p>
          <p>
            Created at:{" "}
            {format(new Date(application.createdAt), "hh:mm dd/mm/yyyy")}
          </p>
        </div>
      ))}
    </div>
  );
}
export const revalidate = 0;
