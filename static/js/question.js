var queId;

function verify() {
    var oldnumber = $('#question').text();
    $("input[name='option']:checked").each(function () {
        oldnumber += ','+($(this).attr('value'));
    })
    var singlechoice = $('input[name="singleoption"]:checked').val();

    var freeanswer = $('#freeanswer').val();

    var number = oldnumber.replace("Q. ", "");
    queId = Number(number[0]);
    var number_list = number.split(",");
    number_list.splice(0,1);
    // alert(singlechoice);


    $.ajax({
        type:"GET",
        url:"/verify",
        data:{"selectedOption":number, "FreeAnswer":freeanswer, "singlechoice":singlechoice},
        dataType:"json",
        success: function (data) {
            if((number_list.length==0)&&((freeanswer=="")||(freeanswer==undefined))&&(singlechoice=="")){
                // alert(number_list);
                // alert(freeanswer);
                alert("Please enter your answer!");
            }else{
                // alert(number_list);
                // alert(freeanswer);
                que_exp = data.data[3]
                que_type = data.data[4]
                que_status = data.data[5]
                overall = data.data[6]

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
                    answer_score.innerText = "Score: " + free_score + "/" + overall;

                    answer_container.appendChild(answer_sum);
                    answer_container.appendChild(answer_score);

                    var answer_exp = document.createElement("div");
                    answer_exp.className = "lead";
                    answer_exp.style = "text-align: left";
                    answer_exp.innerHTML = free_exp;
                    answer_container.appendChild(answer_exp);


                } else if (que_type == "Multiple Choice") {
                    selected_options = data.data[0].split(",")
                    selected_options.splice(0, 1)
                    score = data.data[1]
                    explanation = data.data[2]
                    video = data.data[7]
                    len = explanation.length


                    var answer_sum = document.createElement("p");
                    answer_sum.className = "lead";
                    answer_sum.innerText = "You selected: " + selected_options;
                    var answer_score = document.createElement("p");
                    answer_score.className = "lead";
                    answer_score.innerText = "Score: " + score + "/" + overall;

                    answer_container.appendChild(answer_sum);
                    answer_container.appendChild(answer_score);

                    if(video){
                    var queVideo = document.createElement("div");
                    queVideo.class = "row";
                    var queVideotag = document.createElement("video");
                    queVideotag.controls = "controls";
                    queVideotag.width = "720";
                    var queVideosrc = document.createElement("source");
                    queVideosrc.src = "/media/"+video;
                    queVideosrc.type = "video/mp4";
                    queVideotag.appendChild(queVideosrc);
                    queVideo.appendChild(queVideotag);
                    answer_container.appendChild(queVideo);
                    }

                    for (var i = 0; i < len; i++) {
                        var answer_exp = document.createElement("div");
                        answer_exp.className = "lead";
                        answer_exp.style = "text-align: left";
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

                    // alert(selected_options);

                    var answer_sum = document.createElement("p");
                    answer_sum.className = "lead";
                    answer_sum.innerText = "You selected: " + selected_options;
                    var answer_score = document.createElement("p");
                    answer_score.className = "lead";
                    answer_score.innerText = "Score: " + score + "/" + overall;

                    answer_container.appendChild(answer_sum);
                    answer_container.appendChild(answer_score);

                    for (var i = 0; i < len; i++) {
                        var answer_exp = document.createElement("div");
                        answer_exp.className = "lead";
                        answer_exp.style = "text-align: left";
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


                if(que_type == "Free Text"){
                    var button_submit = document.getElementById("button_submit");
                    button_submit.style.visibility = "hidden";

                    var button_next = document.getElementById("button_next");
                    button_next.style.visibility = "hidden";

                    var button_next = document.getElementById("button_withoutredo");
                    button_next.style.visibility = "visible";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "hidden";

                    var button_last = document.getElementById("button_last");
                    button_last.style.visibility = "hidden";

                    var button_next_last = document.getElementById("button_next_last");
                    button_next_last.style.visibility = "hidden";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";
                }else{
                    var button_submit = document.getElementById("button_submit");
                    button_submit.style.visibility = "hidden";

                    var button_next = document.getElementById("button_next");
                    button_next.style.visibility = "visible";

                    var button_next = document.getElementById("button_withoutredo");
                        button_next.style.visibility = "hidden";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "hidden";

                    var button_last = document.getElementById("button_last");
                    button_last.style.visibility = "hidden";

                    var button_next_last = document.getElementById("button_next_last");
                    button_next_last.style.visibility = "hidden";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";
                }

            }


        }


    })

}


function nextQue(){
    var currentQue  = ++ queId;
    var question = document.getElementById("question");
    question.innerText = "Q. " + currentQue;

    $.ajax({
            type:"GET",
            url:"/nextQue",
            data:{"currentQue":currentQue},
            dataType:"json",
            success: function (data) {
                $("#jumbotron_content").children().remove();
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
                // alert(currentLinkStatus);

                var currentQueid = data[0].questionid;

                var queTopic = document.createElement("h5");
                queTopic.align = "left";
                queTopic.innerText = "Topic: " + currentTopic;
                $("#jumbotron_content").append(queTopic);

                var queDescription = document.createElement("div");
                queDescription.className = "lead";
                queDescription.align = "left";
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
                    queVideo.class = "row";
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

                    } else if (currentType == "Single Choice") {
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

                            opTdbox.appendChild(opRadio);
                            opTr.appendChild(opTdbox);
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

                    var button_next = document.getElementById("button_withoutredo");
                    button_next.style.visibility = "hidden";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "visible";

                    var button_last = document.getElementById("button_last");
                    button_last.style.visibility = "hidden";

                    var button_next_last = document.getElementById("button_next_last");
                    button_next_last.style.visibility = "hidden";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";

                }else {
                    var button_submit = document.getElementById("button_submit");
                    button_submit.style.visibility = "visible";

                    var button_next = document.getElementById("button_next");
                    button_next.style.visibility = "hidden";

                    var button_next = document.getElementById("button_withoutredo");
                    button_next.style.visibility = "hidden";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "hidden";

                    var button_last = document.getElementById("button_last");
                    button_last.style.visibility = "hidden";

                    var button_next_last = document.getElementById("button_next_last");
                    button_next_last.style.visibility = "hidden";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";
                }
            }
        })

}


function redoQue(){
    var currentQue  = queId;
    var question = document.getElementById("question");
    question.innerText = "Q. " + currentQue;

    $.ajax({
            type:"GET",
            url:"/nextQue",
            data:{"currentQue":currentQue},
            dataType:"json",
            success: function (data) {
                $("#jumbotron_content").children().remove();
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
                // alert(currentLinkStatus);

                var currentQueid = data[0].questionid;

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
                    queVideo.class = "row";
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

                    } else if (currentType == "Single Choice") {
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

                            opTdbox.appendChild(opRadio);
                            opTr.appendChild(opTdbox);
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

                    var button_next = document.getElementById("button_withoutredo");
                    button_next.style.visibility = "hidden";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "visible";

                    var button_last = document.getElementById("button_last");
                    button_last.style.visibility = "hidden";

                    var button_next_last = document.getElementById("button_next_last");
                    button_next_last.style.visibility = "hidden";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";

                }else {
                    var button_submit = document.getElementById("button_submit");
                    button_submit.style.visibility = "visible";

                    var button_next = document.getElementById("button_next");
                    button_next.style.visibility = "hidden";

                    var button_next = document.getElementById("button_withoutredo");
                    button_next.style.visibility = "hidden";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "hidden";

                    var button_last = document.getElementById("button_last");
                    button_last.style.visibility = "hidden";

                    var button_next_last = document.getElementById("button_next_last");
                    button_next_last.style.visibility = "hidden";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";
                }
            }
        })

}


function finalredoQue(){
    var currentQue  = 9;
    var question = document.getElementById("question");
    question.innerText = "Q. " + currentQue;

    $.ajax({
            type:"GET",
            url:"/nextQue",
            data:{"currentQue":currentQue},
            dataType:"json",
            success: function (data) {
                $("#jumbotron_content").children().remove();
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
                // alert(currentLinkStatus);

                var currentQueid = data[0].questionid;

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
                    queVideo.class = "row";
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

                    } else if (currentType == "Single Choice") {
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

                            opTdbox.appendChild(opRadio);
                            opTr.appendChild(opTdbox);
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

                    var button_submit = document.getElementById("button_submit");
                    button_submit.style.visibility = "hidden";

                    var button_next = document.getElementById("button_next");
                    button_next.style.visibility = "hidden";

                    var button_link = document.getElementById("button_link");
                    button_link.style.visibility = "visible";

                    var button_last = document.getElementById("button_last");
                    button_last.style.visibility = "hidden";

                    var button_next_last = document.getElementById("button_next_last");
                    button_next_last.style.visibility = "hidden";

                    var button_end = document.getElementById("button_end");
                    button_end.style.visibility = "hidden";


            }
        })

}



function next_LinkedQ(){
    var oldnumber = $('#question').text();
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

            var currentDescription = data[0].description;
            var currentType = data[0].type;
            var currentQid = data[0].questionid;
            var currentTopic = data[1];
            var currentImage = data[0].image;
            var currentVideo = data[0].video;
            var currentOpno = data[2];
            var currentOpcontent = data[3];
            var currentOpid = data[4];

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
            $("#button_submit").children().remove();
            $("#button_next").children().remove();
            $("#button_withoutredo").children().remove();



            var button_link = document.getElementById("button_link");
            button_link.style.visibility = "hidden";

            var button_last = document.getElementById("button_last");
            button_last.style.visibility = "visible";

            var button_next_last = document.getElementById("button_next_last");
            button_next_last.style.visibility = "hidden";

            var button_end = document.getElementById("button_end");
            button_end.style.visibility = "hidden";


        }
    })
}


function verify_end(){
    var oldnumber = $('#question').text();
    $("input[name='option']:checked").each(function () {
        oldnumber += ','+($(this).attr('value'));
    })
    var freeanswer = $('#freeanswer').val();

    var number = oldnumber.replace("Q. ", "");
    queId = Number(number[0]);
    var number_list = number.split(",");
    number_list.splice(0,1);

    $.ajax({
        type:"GET",
        url:"/verify",
        data:{"selectedOption":number, "FreeAnswer":freeanswer},
        dataType:"json",
        success: function (data) {

            if((number_list=="")||(freeanswer=="")){
                alert("Please enter your answer!");
            }else{
                que_exp = data.data[3]
                que_type = data.data[4]
                que_status = data.data[5]
                overall = data.data[6]

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
                    answer_score.innerText = "Score: " + free_score + "/" + overall;

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
                    answer_score.innerText = "Score: " + score + "/" + overall;

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
                    answer_score.innerText = "Score: " + score + "/" + overall;

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

                $("#button_submit").children().remove();
                $("#button_next").children().remove();
                $("#button_withoutredo").children().remove();


                var button_link = document.getElementById("button_link");
                button_link.style.visibility = "hidden";

                var button_last = document.getElementById("button_last");
                button_last.style.visibility = "hidden";

                var button_next_last = document.getElementById("button_next_last");
                button_next_last.style.visibility = "visible";

                var button_end = document.getElementById("button_end");
                button_end.style.visibility = "hidden";
            }

        }


    })

}


function showEnd(){
    var currentQue  = ++ queId;
    var endFlag = true;
    var lastQid=currentQue-1;

     $.ajax({
            type:"GET",
            url:"/endTraining",
            data:{"currentQue":currentQue},
            dataType:"json",
            success: function (data) {
                $('h3').remove();
                $("#jumbotron_content").children().remove();

                var endTitle = document.createElement("h3");
                endTitle.align = "center";
                endTitle.innerText = "Congratulations! You have completed all the training!";

                $("#jumbotron_content").append(endTitle);

                $("#button_submit").children().remove();
                $("#button_next").children().remove();
                $("#button_withoutredo").children().remove();
                $("#button_link").children().remove();
                $("#button_last").children().remove();
                $("#button_next_last").children().remove();


                var button_end = document.getElementById("button_end");
                button_end.style.visibility = "visible";

            }
        })
}


function showTopic(){
    var e = e ? e : window.event;
    var tar = e.srcElement || e.target;
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

