## Documentation

You can see below the API reference of this module.

### `GhOrgMembers(options, callback)`
Inits the `GhOrgMembers` instance.

#### Params
- **Object** `options`: An object containing the following fields:
 - `container` (String|HTMLElement): The container element (e.g. `".myClass"`, `document.getElementById("foo")`).
 - `user` (String|HTMLElement): The user element (e.g. `".user"`, `document.getElementById("user")`).
 - `userTempl` (String): The HTML string to use, without selecting an HTML element.
 - `org` (String): The organization name (e.g. `"GitHub"`).
 - `source` (String): An optional url that should serve all the members. It is useful for getting the private members, without depending on the rate limits.
- **Function** `callback`: An optional callback.

#### Return
- **Object** An object containing the following fields:
 - [`modifyData` (Function)](#selfmodifydataerr-members)
 - [`done` (Function)](#selfdoneerr-members)

### `modifyData(err, members)`
This method is called after fetching the users and before rendering the HTML.

#### Params
- **Object** `err`: The response error value.
- **Array** `members`: The fetched members.

#### Return
- **Object** An object containing the `err` and `members` fields.

### `done(err, members)`
This method is called after HTML rendering is done.

#### Params
- **Object** `err`: The response error value.
- **Array** `members`: The fetched members.

