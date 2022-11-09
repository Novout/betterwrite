# Entity Model

Entity Model (or block-style) is an editor style where each inserted item is an item that is independent of the other items. This type of approach allowed the possibility of creating a fully customizable editor, in this specific case, a document customization.

### Contenteditable

To more easily deal with the issue of data entry (mainly keyboard related) it was necessary to create a specific package (better-write-contenteditable-ast) to deal only with the editor and provide what is necessary for the tools that depend on it (eg document exporters). The contenteditable is an html helper that allows you to treat a specific tag as editable (similar to input). The great advantage is its adaptability and the possibility of control that the tool provides, allowing you to browse the AST in a more coherent way (and without worrying about errors in italics, for example).

> The AST itself was built only in version v3, as the editor has already gone through other ways of working before arriving at this solution.

### Annotations Editor

The annotations do not use the proprietary editor because its purpose is different from the primary focus, which made it necessary to integrate an editor that allows a different way of dealing with the necessary resources.

> Generators rely on the proprietary AST to transform the default DOM generated from contenteditable to a more readable approach, described in the [generator flow](./GENERATOR_FLOW.md) section.
