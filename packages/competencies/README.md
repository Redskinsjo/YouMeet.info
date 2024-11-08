Centralize competencies titles. Fastly get unique competencies from all sectors (mainly, for recruitment enterprises). Helps finding competency that was derived. For example, request for whether react, ReactJS, or react.js, always get the unique React.js. Can be used in the frontend or the backend. This package is part of the YouMeet.info project.

**Get one competency** by its title

```
import { getOne } from "@youmeet/competencies"

const one = await getOne({
    data: {
        title: "reactjs" // or react-JS, React, React Js
    }
})

// Returns: { title: "React.js" }
```

**Get many competencies** by their title

```
import { getMany } from "@youmeet/competencies"

const one = await getMany({
    data: {
        title: "communication"
    }
})

// Returns: [{ title: "Communication orale" }, { title: "Communication écrite"}]
```

**Get more information** about that competency

```
import { getOne } from "@youmeet/competencies"

const one = await getOne({
    data: {
        title: "reactjs" // or react-JS, React, React Js
    },
    includeDefinition: true
})

// Returns: {
//  title: "React.js",
//  definition: "React is a JavaScript library for building user interfaces. It allows...",
//  importance: "React is widely used in the industry due to its efficiency, reusability...",
//  development: "Le développement de la compétence React peut se faire à travers l'apprentissage...",
//  conclusion: "En conclusion, posséder la compétence React ouvre un éventail infini d'opportunités...",
//  slug: "react.js-sQUUa-", // full url: https://www.youmeet.info/react.js-sQUUa-
//  advantages: ["Permet de créer...", "Facilite le développement...", "Optimise les performances...", "Améliore l'expérience..."],
//  examples: ["- Création d'une application...", "- Mise en place d'un tableau...", "- Développement d'une application mobile..."],
//  keywords: [...],
//  relatedSkills: [...]
// }

```
