
# github-org-members.js

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][paypal-donations] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/github-org-members.js.svg)](https://www.npmjs.com/package/github-org-members.js) [![Downloads](https://img.shields.io/npm/dt/github-org-members.js.svg)](https://www.npmjs.com/package/github-org-members.js) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> A JavaScript library for fetching and rendering in HTML the members of a GitHub organization.

## :cloud: Installation

```sh
$ npm i --save github-org-members.js
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

## :memo: Documentation


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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
