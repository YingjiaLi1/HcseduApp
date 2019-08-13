var queId;

function verify() {
    var oldnumber = $('#question').text();
    $("input[name='option']:checked").each(function () {
        oldnumber += ','+($(this).attr('value'));
    })
    var freeanswer = $('#freeanswer').val();

    var number = oldnumber.replace("Q. ", "");
    queId = Number(number[0]);

    $.ajax({
        type:"GET",
        url:"/verify",
        data:{"selectedOption":number, "FreeAnswer":freeanswer},
        dataType:"json",
        success: function (data) {

            que_exp = data.data[3]
            que_type = data.data[4]
            que_status = data.data[5]

            // alert(freeanswer);

            $("#jumbotron_content").children().remove();
            var answer_container = document.createElement("div");


                if (que_type == "Free Text") {
                    free_exp = data.data[1]
                    free_score = data.data[2]

                    var answer_sum = document.createElement("div");
                    answer_sum.className = "lead";
                    answer_sum.innerHTML = "Your answer is: " + freeanswer;
                    var answer_score = document.createElement("p");
                    answer_score.className = "lead";
                    answer_score.innerText = "Score: " + free_score;

                    answer_container.appendChild(answer_sum);
                    answer_container.appendChild(answer_score);

                    var answer_exp = document.createElement("div");
                    answer_exp.className = "lead";
                    answer_exp.innerHTML = free_exp;
                    answer_container.appendChild(answer_exp);


                } else if (que_type == "Multiple Choice") {
                    selected_options = data.data[0].split(",")
                    selected_options.splice(0, 1)
                    score = data.data[1]
                    explanation = data.data[2]
                    len = explanation.length


                    var answer_sum = document.createElement("p");
                    answer_sum.className = "lead";
                    answer_sum.innerText = "You selected: " + selected_options;
                    var answer_score = document.createElement("p");
                    answer_score.className = "lead";
                    answer_score.innerText = "Score: " + score;

                    answer_container.appendChild(answer_sum);
                    answer_container.appendChild(answer_score);

                    for (var i = 0; i < len; i++) {
                        var answer_exp = document.createElement("div");
                        answer_exp.className = "lead";
                        answer_exp.innerHTML = selected_options[i] + ":    " + explanation[i];
                        var new_line = document.createElement("p");
                        new_line.className = "card-text";
                        answer_container.appendChild(answer_exp);
                        answer_container.appendChild(new_line)
                    }

                } else if (que_type == "Assertion Reason") {
                    selected_options = data.data[0].split(",")
                    selected_options.splice(0, 1)
                    score = data.data[1]
                    explanation = data.data[2]
                    len = explanation.length


                    var answer_sum = document.createElement("p");
                    answer_sum.className = "lead";
                    answer_sum.innerText = "You selected: " + selected_options;
                    var answer_score = document.createElement("p");
                    answer_score.className = "lead";
                    answer_score.innerText = "Score: " + score;

                    answer_container.appendChild(answer_sum);
                    answer_container.appendChild(answer_score);

                    for (var i = 0; i < len; i++) {
                        var answer_exp = document.createElement("div");
                        answer_exp.className = "lead";
                        answer_exp.innerHTML = explanation[i];
                        var new_line = document.createElement("p");
                        new_line.className = "card-text";
                        answer_container.appendChild(answer_exp);
                        answer_container.appendChild(new_line)
                    }
                }


                if (que_exp != "null") {
                    var question_exp = document.createElement("div");
                    question_exp.className = "lead";
                    question_exp.innerHTML = "Generally:  " + que_exp;
                    answer_container.appendChild(question_exp);
                }

                $("#jumbotron_content").append(answer_container);



            var button_submit = document.getElementById("button_submit");
            button_submit.style.visibility = "hidden";

            var button_next = document.getElementById("button_next");
            button_next.style.visibility = "visible";

            var button_link = document.getElementById("button_link");
            button_link.style.visibility = "hidden";

            var button_end = document.getElementById("button_end");
            button_end.style.visibility = "hidden";
        }


    })

}

function nextQue(){
    var currentQue  = ++ queId;
    var endFlag = true;

    if(currentQue==10||currentQue==11||currentQue==2){
        $.ajax({
            type:"GET",
            url:"/endTraining",
            data:{"currentQue":currentQue},
            dataType:"json",
            success: function (data) {
                $('h3').remove();
                $("#jumbotron_content").children().remove();
                // $("#button_next").children().remove();

                var endTitle = document.createElement("h3");
                endTitle.align = "center";
                endTitle.innerText = "Congratulations! You have completed all the training!";
                // var endDiv = document.createElement("div");
                // endDiv.className = "jumbotron";
                // var showHistory = document.createElement("a");
                // // showHistory.href = "{% url 'index' %}";
                // showHistory.role = "button";
                // showHistory.id = "button";
                // showHistory.className = "btn btn-lg btn-primary";
                // showHistory.innerText = "View Training History";

                // endDiv.appendChild(showHistory);

                $("#jumbotron_content").append(endTitle);

                var button_submit = document.getElementById("button_submit");
                button_submit.style.visibility = "hidden";

                var button_next = document.getElementById("button_next");
                button_next.style.visibility = "hidden";

                var button_link = document.getElementById("button_link");
                button_link.style.visibility = "hidden";

                var button_end = document.getElementById("button_end");
                button_end.style.visibility = "visible";

            }
        })
    }else{
        var question = document.getElementById("question");
        question.innerText = "Q. " + currentQue;
    // alert(++ queId);
    // alert("a");
        $.ajax({
            type:"GET",
            url:"/nextQue",
            data:{"currentQue":currentQue},
            dataType:"json",
            success: function (data) {
                $("#jumbotron_content").children().remove();
                //currentQuetion = JSON.parse(data.data[0]);
                //obj = currentQuetion[0];
                // alert(queId);

                var currentDescription = data[0].description;
                var currentType = data[0].type;
                var currentTopic = data[1];
                var currentImage = data[0].image;
                var currentVideo = data[0].video;
                var currentOpno = data[2];
                var currentOpcontent = data[3];
                var currentOpid = data[4];
                var currentLinkStatus = data[5];
                // var currentOptions = data.data[2];
                // alert(currentLinkStatus);

                var currentQueid = data[0].questionid;
                if(currentQueid==9||currentQueid==10||currentQueid==11){
                    endFlag = false;
                }

                var queTopic = document.createElement("h5");
                queTopic.align = "left";
                queTopic.innerText = "Topic: " + currentTopic;
                $("#jumbotron_content").append(queTopic);

                var queDescription = document.createElement("div");
                queDescription.className = "lead";
                queDescription.innerHTML = currentDescription;
                $("#jumbotron_content").append(queDescription);

                if(currentImage){
                    var queImage = document.createElement("div");
                    queImage.align = "center";
                    var queImagetag = document.createElement("img");
                    queImagetag.src = "/media/"+currentImage;
                    queImage.appendChild(queImagetag);
                    $("#jumbotron_content").append(queImage);
                }

                if(currentVideo){
                    var queVideo = document.createElement("div");
                    queImage.class = "row";
                    var queVideotag = document.createElement("video");
                    queVideotag.controls = "controls";
                    queVideotag.width = "720";
                    var queVideosrc = document.createElement("source");
                    queVideosrc.src = "/media/"+currentVideo;
                    queVideosrc.type = "video/mp4";
                    queVideotag.appendChild(queVideosrc);
                    queVideo.appendChild(queVideotag);
                    $("#jumbotron_content").append(queVideo);
                }


                if(currentLinkStatus){
                    var queOptions = document.createElement("div");
                    if (currentType == "Multiple Choice") {
                        var opTable = document.createElement("table");
                        opTable.class = "table";
                        opTable.align = "center";
                        for (var i = 0; i < currentOpno.length; i++) {
                            var opTbody = document.createElement("tbody");
                            var opTr = document.createElement("tr");
                            opTr.class = "tr";
                            opTr.align = "left";
                            var opTdbox = document.createElement("td");
                            opTdbox.width = "50";
                            var opRadio = document.createElement("input");
                            opRadio.class = "radio";
                            opRadio.id = currentOpid[i];
                            opRadio.type = "radio";
                            opRadio.name = "radiooption";
                            opRadio.value = currentOpno[i];
                            var tdOpno = document.createElement("td");
                            tdOpno.align = "left";
                            tdOpno.width = "50";
                            tdOpno.innerText = currentOpno[i];
                            var tdOpcontent = document.createElement("td");
                            tdOpcontent.align = "left";
                            tdOpcontent.innerText = currentOpcontent[i];

                            opTr.appendChild(opTdbox);
                            opTdbox.appendChild(opRadio);
                            opTr.appendChild(tdOpno);
                            opTr.appendChild(tdOpcontent);
                            opTbody.appendChild(opTr);
                            opTable.appendChild(opTbody);
                            queOptions.appendChild(opTable);
                        }

                        $("#jumbotron_content").append(queOptions);

                    }
                }else {
                    var queOptions = document.createElement("div");
                    // queOptions.className = "jumbotron";
                    if (currentType == "Free Text") {
                        var answerArea = document.createElement("textarea");
                        answerArea.type = "text";
                        answerArea.required = "TRUE";
                        answerArea.rows = "8";
                        answerArea.cols = "80";
                        queOptions.appendChild(answerArea);
                        $("#jumbotron_content").append(queOptions);

                    } else if (currentType == "Multiple Choice") {
                        var opTable = document.createElement("table");
                        opTable.class = "table";
                        opTable.align = "center";
                        for (var i = 0; i < currentOpno.length; i++) {
                            var opTbody = document.createElement("tbody");
                            var opTr = document.createElement("tr");
                            opTr.class = "tr";
                            opTr.align = "left";
                            var opTdbox = document.createElement("td");
                            opTdbox.width = "50";
                            var opCheckbox = document.createElement("input");
                            opCheckbox.class = "check";
                            opCheckbox.id = currentOpid[i];
                            opCheckbox.type = "checkbox";
                            opCheckbox.name = "option";
                            opCheckbox.value = currentOpno[i];
                            var tdOpno = document.createElement("td");
                            tdOpno.align = "left";
                            tdOpno.width = "50";
                            tdOpno.innerText = currentOpno[i];
                            var tdOpcontent = document.createElement("td");
                            tdOpcontent.align = "left";
                            tdOpcontent.innerText = currentOpcontent[i];

                            opTr.appendChild(opTdbox);
                            opTdbox.appendChild(opCheckbox);
                            opTr.appendChild(tdOpno);
                            opTr.appendChild(tdOpcontent);
                            opTbody.appendChild(opTr);
                            opTable.appendChild(opTbody);
                            queOptions.appendChild(opTable);
                        }

                        $("#jumbotron_content").append(queOptions);

                    } else if (currentType == "Assertion Reason") {
                        var opTable = document.createElement("table");
                        opTable.class = "table";
                        opTable.align = "center";
                        for (var i = 0; i < currentOpno.length; i++) {
                            var opTbody = document.createElement("tbody");
                            var opTr = document.createElement("tr");
                            var opTdbox = document.createElement("td");
                            opTdbox.width = "50";
                            var opCheckbox = document.createElement("input");
                            opCheckbox.class = "check";
                            opCheckbox.id = currentOpid[i];
                            opCheckbox.type = "checkbox";
                            opCheckbox.name = "option";
                            opCheckbox.value = currentOpno[i];
                            var tdOpno = document.createElement("td");
                            tdOpno.align = "left";
                            tdOpno.width = "50";
                            tdOpno.innerText = currentOpno[i];
                            var tdOpcontent = document.createElement("td");
                            tdOpcontent.align = "left";
                            tdOpcontent.innerText = currentOpcontent[i];

                            opTr.appendChild(opTdbox);
                            opTdbox.appendChild(opCheckbox);
                            opTr.appendChild(tdOpno);
                            opTr.appendChild(tdOpcontent);
                            opTbody.appendChild(opTr);
                            opTable.appendChild(opTbody);
                            queOptions.appendChild(opTable);
                        }
                        $("#jumbotron_content").append(queOptions);

                    }
                }

                if(currentLinkStatus){
                    var button_submit = document.getElementById("button_submit");
                    button_submit.style.visibility = "hidden";

                    var button_next = document.getElementById("button_next");
                    button_next.style.visibility = "hidden";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "visible";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";

                }else {
                    var button_submit = document.getElementById("button_submit");
                    button_submit.style.visibility = "hidden";

                    var button_next = document.getElementById("button_next");
                    button_next.style.visibility = "visible";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "hidden";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";
                }
            }
        })



    }

}











function next_LinkedQ(){
    var oldnumber = $('#question').text();

    // alert("test")
    // alert( $('input[name="radiooption"]:checked').val())
    // $('input[name="radiooption"]:checked').val();
    oldnumber += ','+$('input[name="radiooption"]:checked').val();

    var number = oldnumber.replace("Q. ", "");
    queId = Number(number[0]);

    $.ajax({
        type: "GET",
        url: "/nextLinkQ",
        data: {"selectedOption": number},
        dataType: "json",
        success: function (data) {
            $("#jumbotron_content").children().remove();
                //currentQuetion = JSON.parse(data.data[0]);
                //obj = currentQuetion[0];
                // alert(queId);

            var currentDescription = data[0].description;
            var currentType = data[0].type;
            var currentQid = data[0].questionid;
            var currentTopic = data[1];
            var currentImage = data[0].image;
            var currentVideo = data[0].video;
            var currentOpno = data[2];
            var currentOpcontent = data[3];
            var currentOpid = data[4];
            // var currentLinkStatus = data[5];
            // var currentOptions = data.data[2];
            // alert(currentDescription);

            $("h3").text("Q. "+currentQid);

            var queTopic = document.createElement("h5");
            queTopic.align = "left";
            queTopic.innerText = "Topic: " + currentTopic;
            $("#jumbotron_content").append(queTopic);

            var queDescription = document.createElement("div");
            queDescription.className = "lead";
            queDescription.innerHTML = currentDescription;
            $("#jumbotron_content").append(queDescription);

            if(currentImage){
                var queImage = document.createElement("div");
                queImage.align = "center";
                var queImagetag = document.createElement("img");
                queImagetag.src = "/media/"+currentImage;
                queImage.appendChild(queImagetag);
                $("#jumbotron_content").append(queImage);
            }

            if(currentVideo){
                var queVideo = document.createElement("div");
                queImage.class = "row";
                var queVideotag = document.createElement("video");
                queVideotag.controls = "controls";
                queVideotag.width = "720";
                var queVideosrc = document.createElement("source");
                queVideosrc.src = "/media/"+currentVideo;
                queVideosrc.type = "video/mp4";
                queVideotag.appendChild(queVideosrc);
                queVideo.appendChild(queVideotag);
                $("#jumbotron_content").append(queVideo);
            }

            var queOptions = document.createElement("div");
                    // queOptions.className = "jumbotron";
            if (currentType == "Free Text") {
                var answerArea = document.createElement("textarea");
                answerArea.type = "text";
                answerArea.required = "TRUE";
                answerArea.rows = "8";
                answerArea.cols = "80";
                queOptions.appendChild(answerArea);
                $("#jumbotron_content").append(queOptions);

            } else if (currentType == "Multiple Choice") {
                var opTable = document.createElement("table");
                opTable.class = "table";
                opTable.align = "center";
                for (var i = 0; i < currentOpno.length; i++) {
                    var opTbody = document.createElement("tbody");
                    var opTr = document.createElement("tr");
                    opTr.class = "tr";
                    opTr.align = "left";
                    var opTdbox = document.createElement("td");
                    opTdbox.width = "50";
                    var opCheckbox = document.createElement("input");
                    opCheckbox.class = "check";
                    opCheckbox.id = currentOpid[i];
                    opCheckbox.type = "checkbox";
                    opCheckbox.name = "option";
                    opCheckbox.value = currentOpno[i];
                    var tdOpno = document.createElement("td");
                    tdOpno.align = "left";
                    tdOpno.width = "50";
                    tdOpno.innerText = currentOpno[i];
                    var tdOpcontent = document.createElement("td");
                    tdOpcontent.align = "left";
                    tdOpcontent.innerText = currentOpcontent[i];

                    opTr.appendChild(opTdbox);
                    opTdbox.appendChild(opCheckbox);
                    opTr.appendChild(tdOpno);
                    opTr.appendChild(tdOpcontent);
                    opTbody.appendChild(opTr);
                    opTable.appendChild(opTbody);
                    queOptions.appendChild(opTable);
                }

                $("#jumbotron_content").append(queOptions);

            } else if (currentType == "Assertion Reason") {
                var opTable = document.createElement("table");
                opTable.class = "table";
                opTable.align = "center";
                for (var i = 0; i < currentOpno.length; i++) {
                    var opTbody = document.createElement("tbody");
                    var opTr = document.createElement("tr");
                    var opTdbox = document.createElement("td");
                    opTdbox.width = "50";
                    var opCheckbox = document.createElement("input");
                    opCheckbox.class = "check";
                    opCheckbox.id = currentOpid[i];
                    opCheckbox.type = "checkbox";
                    opCheckbox.name = "option";
                    opCheckbox.value = currentOpno[i];
                    var tdOpno = document.createElement("td");
                    tdOpno.align = "left";
                    tdOpno.width = "50";
                    tdOpno.innerText = currentOpno[i];
                    var tdOpcontent = document.createElement("td");
                    tdOpcontent.align = "left";
                    tdOpcontent.innerText = currentOpcontent[i];

                    opTr.appendChild(opTdbox);
                    opTdbox.appendChild(opCheckbox);
                    opTr.appendChild(tdOpno);
                    opTr.appendChild(tdOpcontent);
                    opTbody.appendChild(opTr);
                    opTable.appendChild(opTbody);
                    queOptions.appendChild(opTable);
                }
                $("#jumbotron_content").append(queOptions);

            }
            var button_submit = document.getElementById("button_submit");
            button_submit.style.visibility = "visible";

            var button_next = document.getElementById("button_next");
            button_next.style.visibility = "hidden";

            var button_link = document.getElementById("button_link");
            button_link.style.visibility = "hidden";

            var button_end = document.getElementById("button_end");
            button_end.style.visibility = "hidden";
        }
    })
}



function showTopic(){
    var e = e ? e : window.event;
    var tar = e.srcElement || e.target;
    // var tarClass = tar.className;
    var tarId = tar.id;
    setActive(tarId);
    showContent(tarId);


}
function showContent(tarId) {
    $.ajax({
        type: "GET",
        url: "/showTopic",
        data: {"tarId": tarId},
        dataType: "json",
        success: function (data) {
            $("#topic_content").children().remove();

            var topic_name = document.createElement("h1");
            topic_name.innerText = data[0];
            $("#topic_content").append(topic_name);

            var topic_des = document.createElement("div");
            topic_des.className = "jumbotron";
            var t_description = document.createElement("div");
            t_description.className = "lead";
            t_description.innerHTML = data[1];

            topic_des.appendChild(t_description);
            $("#topic_content").append(topic_des);
        }
    })
}

function setActive (id) {
    var eles = document.getElementsByClassName("nav-link active");
    Array.from(eles).forEach((el)=>{
        el.className="nav-link";
    })
    var a = document.getElementById("Social Engineering");
    document.getElementById(id).className = "nav-link active";
}


function updateProfile(){

}
