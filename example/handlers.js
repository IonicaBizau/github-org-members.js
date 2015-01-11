window.addEventListener("load", function () {
    var orgMembers = GhOrgMembers({
        container: "org-members"
      , user: "user"
      , org: "github"
    });

    orgMembers.done = function (err, data) {
        document.getElementById("count").innerHTML = data.length.toString();
    };
});
