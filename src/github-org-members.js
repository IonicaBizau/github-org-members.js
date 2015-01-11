(function (window) {

    function $(s, c) {
        if (typeof s !== "string") { return s; }
        c = c || document;

        if (typeof c === "string") {
            c = $(c);
        }

        return c.querySelector(s);
    }

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


    function getAllMembers (org, token, callback) {
        var apiUrl = "https://api.github.com/orgs/"
          + org + "/members?per_page=100&access_token="
          + token + "&page="
          , data = []
          ;

        function getSeq(p) {
            $.getJSON(apiUrl + p, function (err, dSeq) {
                if (err) { return callback(err); }
                data = data.concat(dSeq);
                if (dSeq.length === 0) {
                    return callback(null, data);
                }
                getSeq(p + 1);
            });
        }

        getSeq(1);
    }

    function Mustache (template, data) {

        var fields = []
          , re = /{{([^}}]+)}}/g
          , text
          ;

        while (text = re.exec(template)) {
            fields.push(text[1]);
        }

        for (var i = 0; i < fields.length; ++i) {
            template = template.replace(new RegExp("{{" + fields[i] + "}}"), data[fields[i]]);
        }

        return template;
    }

    function GhOrgMembers(options) {
        var containerEl = $(options.container)
          , userEl = $(options.user, containerEl)
          , userHtml = userEl.outerHTML
          , html = ""
          , i = 0
          , self = {
                modifyData: function (err, members) {
                    return { err: err, members: members };
                }
              , done: function (err, members) {}
            }
          ;

        userEl.remove();
        getAllMembers(options.org, options.token, function (err, members) {

            var mData = self.modifyData(err, members);
            err = mData.err;
            members = mData.members;

            if (err) {
                html = "An error ocured."
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

    window.GhOrgMembers = GhOrgMembers;
})(window);
