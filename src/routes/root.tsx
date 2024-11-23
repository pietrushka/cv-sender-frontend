import Box from "@mui/joy/Box";
import { SingleSelect } from "../components/SingleSelect";
import { MultiSelect } from "../components/MultiSelect";
import { OfferList } from "../components/OfferList";

export function Root() {
  return (
    <main>
      <Box sx={{ display: "flex", gap: 2 }}>
        <SingleSelect
          placeholder="Ma link"
          queryStringKey="hasApplyUrl"
          options={[
            { code: "true", name: "has apply url" },
            { code: "false", name: "without apply url" },
          ]}
        />

        <MultiSelect
          placeholder="Technologie"
          queryStringKey="tech"
          options={[
            { code: "typescript", name: "Typescript" },
            { code: "javascript", name: "Javascipt" },
          ]}
        />
      </Box>
      <OfferList />
    </main>
  );
}
