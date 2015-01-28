window.addEventListener("load", function () {

    var orgMembers = GhOrgMembers({
        container: "org-members"
      , userTempl: "<user>"
                 + "    <a href='{{html_url}}' target='blank'>"
                 + "        <img src='{{avatar_url}}' class='avatar'>"
                 + "        <span class='name'>{{login}}</span>"
                 + "    </a>"
                 + "</user>"
      , org: "jillix"
    });

    orgMembers.done = function (err, data) {
        if (err) { return; }
        document.getElementById("count").innerHTML = data.length.toString();
        document.querySelector(".description").style.display = "block";
    };
});
