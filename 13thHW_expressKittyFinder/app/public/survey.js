$(".chosen-select").html(`
    <option value=""></option>
    <option value="1">1 (Strongly Disagree)</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5 (Strongly Agree)</option>
    `);
    let config = {
        ".chosen-select": {},
        ".chosen-select-deselect": {
            allow_single_deselect: true
        },
        ".chosen-select-no-single": {
            disable_search_threshold: 10
        },
        ".chosen-select-no-results": {
            no_results_text: "Oops, nothing found!"
        },
        ".chosen-select-width": {
            width: "95%"
        }
    };

    for (selector in config) {
        $(selector).chosen(config[selector]);
    };

    // Capture the form inputs
    $("#submit").on("click", function(event) {
        event.preventDefault();
        if (Array.from($(".chosen-select, .form-control")).reduce((accu,e)=>{$(e).val()==""?accu=false:null;return accu},true)) {
            class UserData {
                constructor(){
                    this.name = $("#name").val(),
                    this.photo = $("#photo").val(),
                    this.scores = Array.from($(".chosen-select")).reduce((accu,e)=>{
                        accu.push(parseInt($(e).val()));
                        return accu;
                    },[]),
                    this.scoreTotal = this.scores.reduce((accu,e)=>accu+=e,0);
                }
            };
            let thisUser = new UserData
            $.post("/api/friends", thisUser, (data)=> {
                $("#match-info").empty();
                $("#match-info").append(`<img src='${data.selected.photo}'><br>`);
                $("#match-info").append(`<h2>${data.selected.name}</h2><br>
                    <ul>
                    <li> Your scores: ${thisUser.scores} -- Total: ${thisUser.scoreTotal} </li>
                    <li> Their scores: ${data.selected.scores} -- Total: ${data.selected.scoreTotal} </li>
                    <li> Difference between you and ${data.selected.name} = ${data.selected.scoreTotal - thisUser.scoreTotal}
                    <li> Difference between you and others ${data.full.reduce((accu,e, i)=>{
                        accu+= `<strong>${e.name}: ${e.scoreTotal-thisUser.scoreTotal}</strong>`
                        i<data.full.length-1?accu+=`, `:null;
                        return accu;
                    },"")}
                    <li> As you can see, you and ${data.selected.name} have the smallest personality difference!</li>
                    </ul>
                    `);
                    // $("#match-img").attr("src", data.selected.photo);
                    $("#results-modal").modal("toggle");
                });
            } else {
                alert("Please fill out all fields before submitting!");
            };
        });
