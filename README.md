`github-org-members.js`
=====================
A JavaScript library for fetching and rendering in HTML the members of a GitHub organization.

## Demo
[Click here](http://ionicabizau.github.io/github-org-members.js/) for a demo, where we fetch the public members of the [jillix](https://github.com/github) and [GitHub](https://github.com/github) organizations.

[![](http://i.imgur.com/Mjdi8u8.png)](http://ionicabizau.github.io/github-org-members.js/)

## Example

```html
<!-- Organization members container -->
<org-members>
    <!-- CSS Spinner -->
    <div class="loader">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
    </div>

    <!-- User template -->
    <user>
        <a href="{{html_url}}" target="blank">
            <img src="{{avatar_url}}" alt="" class="avatar">
            <span class="name">{{login}}</span>
        </a>
    </user>
</org-members>

<!-- Include the script on the page -->
<script src="path/to/github-org-members.js"></script>

<script>
    var orgMembers = GhOrgMembers({

        // Select the container
        container: "org-members"

        // The user element
      , user: "user"

        // Provide the organization name
      , org: "github"
    });

    orgMembers.done = function (err, data) {
        if (err) { return; }
        document.getElementById("count").innerHTML = data.length.toString();
        document.querySelector(".description").style.display = "block";
    };
</script>
```

## Documentation
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

### `self.modifyData(err, members)`
This method is called after fetching the users and before rendering the HTML.

#### Params
- **Object** `err`: The response error value.
- **Array** `members`: The fetched members.

#### Return
- **Object** An object containing the `err` and `members` fields.

### `self.done(err, members)`
This method is called after HTML rendering is done.

#### Params
- **Object** `err`: The response error value.
- **Array** `members`: The fetched members.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
