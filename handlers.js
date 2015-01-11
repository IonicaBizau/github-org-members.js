window.addEventListener("load", function () {
    var orgMembers = GhOrgMembers({
        container: "org-members"
      , user: "user"
      , org: "github"
      , token: "d93cfb1b68f826db443544f4421db164fea375a1"
    });

    orgMembers.done = function (err, data) {
        if (err) { return; }
        document.getElementById("count").innerHTML = data.length.toString();
        document.querySelector(".description").style.display = "block";
    };
});
