Centralize competencies titles. Fastly get unique competencies from all sectors (mainly, for recruitment enterprises). Helps finding competency that was derived. For example, request for whether react, ReactJS, or react.js, always get the unique React.js. Can be used in the frontend or the backend. This package is part of the YouMeet.info project.

Get one competency by its title

```
import { getOne } from "@youmeet/competencies"

const one = await getOne({
    data: {
        title: "reactjs" // or react-JS, React, React Js
    }
})

// Returns: { title: "React.js" }
```

Get many competencies

```
import { getMany } from "@youmeet/competencies"

const one = await getMany({
    data: {
        title: "communication"
    }
})

// Returns: [{ title: "Communication orale" }, { title: "Communication écrite"}]
```
