export const GetManyCompetenciesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetManyCompetencies" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CompetencyInput" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "PageParamsInput" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } }, "defaultValue": { "kind": "BooleanValue", "value": false } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "competencies" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "includeDefinition" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "definition" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "relatedSkills" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "advantages" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "examples" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "importance" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "development" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "keywords" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "conclusion" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "extension" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }] } }] } }] };
export const GetOneCompetencyDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetOneCompetency" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CompetencyInput" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } }, "defaultValue": { "kind": "BooleanValue", "value": false } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "oneCompetency" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "includeDefinition" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "definition" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "relatedSkills" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "advantages" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "examples" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "importance" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "development" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "keywords" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "conclusion" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "extension" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" }, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "include" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "if" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "includeDefinition" } } }] }] }] } }] } }] };
