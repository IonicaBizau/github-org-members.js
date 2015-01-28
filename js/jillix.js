window.addEventListener("load", function () {

    // Utils
    function $(s) {
        return document.querySelector(s);
    }

    var btn = $(".selector button");
    btn.style.display = "none";


    // Fetch the members
    var orgMembers = GhOrgMembers({
        container: ".jillix-members"
      , userTempl: "<li>"
         + "\n" +  "    <a href='{{html_url}}' target='blank'>"
         + "\n" +  "         <img src='{{avatar_url}}' class='avatar'>"
         + "\n" +  "     </a>"
         + "\n" +  " </li>"
      , source: "https://api.github.com/orgs/jillix/members"
    }, function (err, data) {
        if (err) { return; }
        document.getElementById("count").innerHTML = data.length.toString();
        document.querySelector(".description").style.display = "block";

        var opened = false
          , nbOptions = 4
          , angleStart = -360
          ;

        btn.style.display = "block";

        /*! jquery rotate animation */
        function rotate(li,d) {
            li.style.transform = "rotate(" + d + "deg)";
            if (opened) {
                li.querySelector("img").style.transform = "rotate(" + (-d) + "deg)";
            }
        }

        /*! show / hide the options */
        function toggleOptions(s) {
            opened = !opened;

            var liElms = s.querySelectorAll("li")
              , deg = 360 / liElms.length
              , i = 0
              , d = null
              ;

            for(; i < liElms.length; ++i) {
                d = i * deg;
                opened ? rotate(liElms[i], d) : rotate(liElms[i], angleStart);
            }

            s.classList.toggle("close");
            s.classList.toggle("open");
        }

        btn.addEventListener("click", function(e) {
            toggleOptions(this.parentNode);
        });
    });
});
