import { uri, method, headers } from "./imports";

const getManyCompetenciesQuery = `query GetManyCompetencies($data: CompetencyInput, $params: PageParamsInput) {
  competencies(data: $data, params: $params) {
    id
  }
}
`;

export default async function getManyCompetency(variables) {
  try {
    const response = await fetch(uri, {
      method,
      headers,
      body: JSON.stringify({
        query: getManyCompetenciesQuery,
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
