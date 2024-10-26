import { uri, method, headers } from "./imports";

const getOneCompetencyQuery = `query GetOneCompetency($title: String, $id: ID, $slug: String) {
  oneCompetency(title: $title, id: $id, slug: $slug) {
    id
  }
}
`;

export default async function getOneCompetency(variables) {
  try {
    const response = await fetch(uri, {
      method,
      headers,
      body: JSON.stringify({
        query: getOneCompetencyQuery,
        variables,
      }),
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
