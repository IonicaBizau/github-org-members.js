/*!
 *  github-org-members.js
 *  =====================
 *  A JavaScript library for fetching and rendering in HTML the
 *  members of a GitHub organization.
 *
 *  Developed with JavaScript and Love by Ionică Bizău.
 * */
(function (window) {

    /*! jQuery simulator */
    function $(s, c) {
        if (typeof s !== "string") { return s; }
        c = c || document;

        if (typeof c === "string") {
            c = $(c);
        }

        return c.querySelector(s);
    }

    /*! getJSON implementation in vanilla JS */
    $.getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        callback = callback || function () {};
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(null, JSON.parse(xhr.responseText));
                } else {
                    callback(JSON.parse(xhr.responseText));
                }
            }
        };
    };

    /*! {{Mustache}} like template */
    function Mustache (template, data) {

        var fields = []
          , re = /{{([^}}]+)}}/g
          , text
          ;

        while ((text = re.exec(template)) !== null) {
            fields.push(text[1]);
        }

        for (var i = 0; i < fields.length; ++i) {
            template = template.replace(new RegExp("{{" + fields[i] + "}}"), data[fields[i]]);
        }

        return template;
    }

    /*!
     * getAllMembers
     * Gets all the members from an organization.
     *
     * @name getAllMembers
     * @function
     * @param {String} org The GitHub organization name.
     * @param {String} token Optional token that is passed to the API requests.
     * @param {Function} callback The callback function.
     * @return {undefined}
     */
    function getAllMembers (org, token, callback) {
        var apiUrl = "https://api.github.com/orgs/" + org + "/members?per_page=100"
          , data = []
          ;

        if (token) {
            apiUrl += "&access_token=" + token;
        }

        apiUrl += "&page=";

        function getSeq(p) {
            $.getJSON(apiUrl + p, function (err, dSeq) {
                if (err) { return callback(err); }
                data = data.concat(dSeq);
                if (dSeq.length !== 100) {
                    return callback(null, data);
                }
                getSeq(p + 1);
            });
        }

        getSeq(1);
    }

    /**
     * GhOrgMembers
     * Inits the `GhOrgMembers` instance.
     *
     * @name GhOrgMembers
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `container` (String|HTMLElement): The container element (e.g. `".myClass"`, `document.getElementById("foo")`).
     *  - `user` (String|HTMLElement): The user element (e.g. `".user"`, `document.getElementById("user")`).
     *  - `org` (String): The organization name (e.g. `"GitHub"`).
     *  - `token` (String): An optional token. It is useful for getting the private members and for a greater rate limit.
     *
     * @return {Object} An object containing the following fields:
     *
     *  - [`modifyData` (Function)](#selfmodifydataerr-members)
     *  - [`done` (Function)](#selfdoneerr-members)
     *
     */
    function GhOrgMembers (options) {

        var containerEl = $(options.container)
          , userEl = options.user ? $(options.user) : { outerHTML: options.userTempl }
          , userHtml = userEl.outerHTML
          , html = ""
          , i = 0
          , self = {
                /**
                 * modifyData
                 * This method is called after fetching the users and before rendering the HTML.
                 *
                 * @name modifyData
                 * @function
                 * @param {Object|null} err The response error value.
                 * @param {Array} members The fetched members.
                 * @return {Object} An object containing the `err` and `members` fields.
                 */
                modifyData: function (err, members) {
                    return { err: err, members: members };
                }

                /**
                 * done
                 * This method is called after HTML rendering is done.
                 *
                 * @name done
                 * @function
                 * @param {Object|null} err The response error value.
                 * @param {Array} members The fetched members.
                 */
              , done: function (err, members) {}
            }
          ;

        if (typeof userEl.remove === "function") {
            userEl.remove();
        }

        getAllMembers(options.org, options.token, function (err, members) {

            var mData = self.modifyData(err, members);
            err = mData.err;
            members = mData.members;

            if (err) {
                html = "An error ocured.";
            } else {
                for (; i < members.length; ++i) {
                    html += Mustache(userHtml, members[i]);
                }
            }

            containerEl.innerHTML = html;
            self.done(err, members);
        });
        return self;
    }

    // Version
    GhOrgMembers.version = "1.0.0";

    window.GhOrgMembers = GhOrgMembers;
})(window);
