# github-org-members.js [![Support this project][donate-now]][paypal-donations]

A JavaScript library for fetching and rendering in HTML the members of a GitHub organization.

## Installation

```sh
$ npm i -g github-org-members.js
```

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

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md