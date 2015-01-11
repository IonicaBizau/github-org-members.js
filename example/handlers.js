window.addEventListener("load", function () {
    var orgMembers = GhOrgMembers({
        container: "org-members"
      , user: "user"
      , org: "github"
    });

    orgMembers.done = function (err, data) {
        if (err) { return; }
        document.getElementById("count").innerHTML = data.length.toString();
        document.querySelector(".description").style.display = "block";
    };
});
