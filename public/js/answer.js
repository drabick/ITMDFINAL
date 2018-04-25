$(document).ready(function () {
    $(".answerButton").click(function () {
        //let subject = $(this).attr("Subject");
        //let question = $(this).attr("Question");
        let id = $(this).attr("Qid");
        //console.log(id);
        $.getJSON("/api/questions/" + id, function (resp) {
            $("#alreadyExists").html(
                "<span class='font-weight-bold'> User </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>" + resp.user +
                "<br></span><span class='font-weight-bold'>Subject</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>" + resp.subject +
                "<br></span><span class='font-weight-bold'>Question</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + resp.question + "</span>"
            );

            $("#answerButtonInModal").click(function () {
                let comments = $("#answerGiven").val();
                let answer = {
                    user: resp.user,
                    subject: resp.subject,
                    question: resp.question,
                    comments: comments
                }
                console.log(answer);
                $.post("/answered/" + id, answer, function () { }, "json");
                window.location.replace("/")
            });

        });
    });

    $("#askButtonInModal").click(function () {
        let user = $("#userName").val();
        let subject = $("#subjectChosen").val();
        let question = $("#questionAsked").val();
        let questionAsked = {
            user: user,
            subject: subject,
            question: question,
        }
        $.post("api/questions", questionAsked, function (questionStored) {
            window.location.replace("/");
        }, "json");
    });

});